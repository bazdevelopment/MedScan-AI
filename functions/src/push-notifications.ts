/* eslint-disable max-lines-per-function */
import Expo, { ExpoPushMessage } from 'expo-server-sdk';
import * as functions from 'firebase-functions/v1';

import { admin } from './common';

const ExpoInstance = new Expo();

interface INotificationPayload {
  title: string;
  body: string;
  data?: Record<string, any>;
}

const storeDeviceToken = async (
  {
    deviceToken,
    platform,
    version,
    deviceName,
    deviceModel,
    deviceBrand,
  }: {
    deviceToken: string;
    platform: string;
    version: string;
    deviceName: string;
    deviceModel: string;
    deviceBrand: string;
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

const handleSendGlobalPushNotifications = async (
  data: INotificationPayload,
  context: any,
) => {
  try {
    // Optional admin check for sensitive notifications
    // todo: maybe admin only can send these notifications
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

    // Query device tokens based on filters
    const query = admin.firestore().collection('mobileDevices');

    // Fetch matching device tokens
    const snapshot = await query.get();
    // Extract valid Expo push tokens
    const tokens = snapshot.docs
      .map((doc) => doc.data().deviceToken)
      .filter((token) => Expo.isExpoPushToken(token));

    if (!tokens.length) {
      return {
        success: false,
        message: 'No valid Expo tokens to send notifications',
        totalTokens: 0,
      };
    }

    // Prepare notification messages
    const messages: ExpoPushMessage[] = tokens.map((token) => ({
      to: token,
      title,
      body,
      data: {}, // todo add additionalData in the future if needed
    }));

    const chunks = ExpoInstance.chunkPushNotifications(messages);
    const messagesSent = [];
    for (const chunk of chunks) {
      try {
        const ticketChunk =
          await ExpoInstance.sendPushNotificationsAsync(chunk);
        messagesSent.push(...ticketChunk);
      } catch (error) {
        console.error('Chunk sending error:', error);
      }
    }

    return {
      success: true,
      totalTokens: tokens.length,
      results: messagesSent,
    };
  } catch (error: any) {
    throw new functions.https.HttpsError(error.code, error.message, {
      message: 'Failed to send notifications',
      details: error.details,
    });
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

export { handleSendGlobalPushNotifications, storeDeviceToken };
