/* eslint-disable max-lines-per-function */
import Expo, { ExpoPushMessage } from 'expo-server-sdk';
import * as functions from 'firebase-functions/v1';

import {
  createUserNotificationReferences,
  storeGlobalNotification,
  storeIndividualUserNotification,
} from '../utilities/cloud-functions-utils';
import { admin } from './common';

const ExpoInstance = new Expo();

interface INotificationPayload {
  title: string;
  body: string;
  userId?: string;
  data?: Record<string, any>;
}

const BATCH_SIZE = 500;

const storeDeviceToken = async (
  {
    deviceToken,
    platform,
    version,
    deviceName,
    deviceModel,
    deviceBrand,
    deviceUniqueId,
  }: {
    deviceToken: string;
    platform: string;
    version: string;
    deviceName: string;
    deviceModel: string;
    deviceBrand: string;
    deviceUniqueId: string;
  },
  context: any,
) => {
  if (!deviceToken) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Device token is required',
    );
  }

  try {
    // Reference to the centralized device tokens collection
    const deviceTokenRef = admin
      .firestore()
      .collection('mobileDevices')
      .doc(deviceToken);

    // Prepare token metadata
    const tokenData = {
      deviceToken,
      version,
      deviceName,
      deviceModel,
      deviceBrand,
      deviceUniqueId,
      platform: platform || 'unknown',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      // User association flags
      userId: context.auth ? context.auth.uid : null,
    };

    // Upsert the token with merge to preserve existing data
    await deviceTokenRef.set(tokenData, { merge: true });

    return { success: true, token: deviceToken };
  } catch (error: any) {
    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || 'Error storing token.',
    });
  }
};

// Function to send notification to a single user
const sendUserPushNotification = async (
  data: INotificationPayload,
  context: any,
) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Authentication required',
      );
    }

    // Get user's device tokens
    const devicesSnapshot = await admin
      .firestore()
      .collection('mobileDevices')
      .where('userId', '==', data.userId)
      .get();

    const tokens = devicesSnapshot.docs
      .map((doc) => doc.data().deviceToken)
      .filter((token) => Expo.isExpoPushToken(token));

    if (!tokens.length) {
      return {
        success: false,
        message: 'No valid Expo tokens to send notifications',
      };
    }

    // Send push notification
    const messages: ExpoPushMessage[] = tokens.map((token) => ({
      to: token,
      title: data.title,
      body: data.body,
      data: data.data || {},
    }));

    const chunks = ExpoInstance.chunkPushNotifications(messages);
    const results = await Promise.all(
      chunks.map((chunk) =>
        ExpoInstance.sendPushNotificationsAsync(chunk).catch((error) => {
          console.error('Push notification error:', error);
          return [];
        }),
      ),
    );

    // Store notification in Firestore
    await storeIndividualUserNotification(data.userId as string, data);

    return {
      success: true,
      results: results.flat().length,
    };
  } catch (error: any) {
    throw new functions.https.HttpsError(
      'internal',
      'Failed to send notification',
      error,
    );
  }
};

// Enhanced global push notification function
const handleSendGlobalPushNotifications = async (
  data: INotificationPayload,
  context: any,
) => {
  try {
    // Authentication and input validation
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Authentication required',
      );
    }

    const { title, body } = data;

    if (!title || !body) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Notification title and body are required',
      );
    }

    // Store global notification first
    const globalNotificationRef = await storeGlobalNotification(
      data,
      context.auth.uid,
    );

    // Initialize counters and pagination control
    let processedUsers = 0;
    let lastDocId: string | null = null;
    const messagesSent = [];

    let hasMoreDocuments = true;
    while (hasMoreDocuments) {
      // Query devices with pagination
      let devicesQuery = admin
        .firestore()
        .collection('mobileDevices')
        .orderBy(admin.firestore.FieldPath.documentId())
        .limit(BATCH_SIZE);

      if (lastDocId) {
        devicesQuery = devicesQuery.startAfter(lastDocId);
      }

      const devicesSnapshot = await devicesQuery.get();
      if (devicesSnapshot.empty) {
        hasMoreDocuments = false;
        break;
      }
      if (devicesSnapshot.empty) break;

      // Update lastDocId for next iteration
      lastDocId = devicesSnapshot.docs[devicesSnapshot.docs.length - 1].id;

      // Extract valid tokens
      const tokens = devicesSnapshot.docs
        .map((doc) => doc.data().deviceToken)
        .filter((token) => Expo.isExpoPushToken(token));

      if (tokens.length) {
        // Prepare notification messages
        const messages: ExpoPushMessage[] = tokens.map((token) => ({
          to: token,
          title,
          body,
          data: data.data || {},
        }));

        const chunks = ExpoInstance.chunkPushNotifications(messages);

        // Send chunks sequentially to ensure control over errors
        for (const chunk of chunks) {
          try {
            const ticketChunk =
              await ExpoInstance.sendPushNotificationsAsync(chunk);
            messagesSent.push(...ticketChunk);
          } catch (error) {
            console.error('Chunk sending error:', error);
          }
        }
      }

      // Create user notification references in batches
      const userIds = new Set(
        devicesSnapshot.docs.map((doc) => doc.data().userId),
      );

      await createUserNotificationReferences(Array.from(userIds), title, body);

      processedUsers += userIds.size;
    }

    return {
      success: true,
      totalProcessedUsers: processedUsers,
      globalNotificationId: globalNotificationRef.id,
      totalTokensSent: messagesSent.length,
      messageDetails: messagesSent,
    };
  } catch (error: any) {
    console.error('Error in handleSendGlobalPushNotifications:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to send global notification',
      {
        message: 'An error occurred while processing notifications.',
        details: error,
      },
    );
  }
};

const checkDeviceUniqueIdentifier = async (req: any, res: any) => {
  try {
    // Get deviceId and pushToken from the client
    const { deviceUniqueId } = req.query;

    if (!deviceUniqueId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Device ID is required.',
      );
    }

    const devicesRef = admin.firestore().collection('mobileDevices');

    // Check if the device is already registered
    const deviceQuery = await devicesRef
      .where('deviceUniqueId', '==', deviceUniqueId)
      .get();

    return res.status(200).json({
      message: 'Device identified properly!',
      data: deviceQuery.docs[0].data(),
    });
  } catch (error) {
    console.error('Error checking device trial:', error);

    // Throw a Cloud Function error to the client
    throw new functions.https.HttpsError(
      'unknown',
      'An error occurred while checking device trial.',
    );
  }
};

const handleGetUserNotification = async (
  data: { userId: string; lastDocId: string; limit?: number },
  context: any,
) => {
  try {
    // Authentication check
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Authentication required',
      );
    }

    const { userId, limit = 20, lastDocId } = data;

    if (!userId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'User ID is required',
      );
    }

    let query = admin
      .firestore()
      .collection('notifications')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(limit);

    if (lastDocId) {
      const lastDoc = await admin
        .firestore()
        .doc(`notifications/${lastDocId}`)
        .get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      } else {
        throw new functions.https.HttpsError(
          'not-found',
          'Last document not found',
        );
      }
    }

    const snapshot = await query.get();

    const notifications = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const docId = doc.id; // Explicitly define docId here

        if (data.notificationRef) {
          const globalNotif = await data.notificationRef.get();
          return {
            docId,
            ...globalNotif.data(),
            isRead: data.isRead,
            createdAt: data.createdAt.toDate().toISOString(),
          };
        }
        return {
          docId,
          ...data,
          createdAt: data.createdAt.toDate().toISOString(),
        };
      }),
    );

    return {
      success: true,
      notifications,
      lastDocId: snapshot.docs[snapshot.docs.length - 1]?.id || null,
    };
  } catch (error: any) {
    console.error('Error fetching user notifications:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to fetch user notifications',
      {
        message: 'An error occurred while fetching user notifications.',
        details: error,
      },
    );
  }
};

const handleMarkNotificationAsRead = async (
  data: { notificationId: string },
  context: any,
) => {
  try {
    // Check if user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated to mark notifications as read',
      );
    }

    const { notificationId } = data;

    // Validate input
    if (!notificationId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Notification ID is required',
      );
    }

    // Reference to user's notification
    const notificationRef = admin
      .firestore()
      .collection('notifications')
      .doc(notificationId);

    // Get the notification to verify ownership and current status
    const notificationDoc = await notificationRef.get();

    // Check if notification exists
    if (!notificationDoc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'Notification not found',
      );
    }

    const notificationData = notificationDoc.data();

    // Check if already read to avoid unnecessary updates
    if (notificationData?.isRead) {
      return {
        success: true,
        message: 'Notification was already marked as read',
      };
    }

    // Update the notification
    await notificationRef.update({
      isRead: true,
    });

    return {
      success: true,
      message: 'Notification marked as read successfully.',
    };
  } catch (error) {
    console.error('Error marking notification as read:', error);

    // Handle known error types
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    // Handle unexpected errors
    throw new functions.https.HttpsError(
      'internal',
      'An unexpected error occurred while marking the notification as read',
      error,
    );
  }
};

/** 
 *  Cleanup function for inactive device tokens
 * !Consider removing inactive or making them inactive users in this job storeDeviceToken will be called many many times the submitToken  will be called many times

exports.cleanupInactiveTokens = functions.pubsub
  .schedule('every 30 days')
  .onRun(async (_context) => {
    // Calculate date 90 days ago
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    try {
      // Find and delete tokens inactive for more than 90 days
      const inactiveTokensSnapshot = await admin
        .firestore()
        .collection('mobileDevices')
        .where('updatedAt', '<', ninetyDaysAgo)
        .get();

      const batch = admin.firestore().batch();

      inactiveTokensSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Commit the batch of deletions
      await batch.commit();

      console.log(
        `Cleaned up ${inactiveTokensSnapshot.size} inactive device tokens`,
      );

      return null;
    } catch (error) {
      console.error('Error cleaning up inactive tokens:', error);
      throw error;
    }
  });

  */

export {
  checkDeviceUniqueIdentifier,
  handleGetUserNotification,
  handleMarkNotificationAsRead,
  handleSendGlobalPushNotifications,
  sendUserPushNotification,
  storeDeviceToken,
};
