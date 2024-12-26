import * as functions from 'firebase-functions/v1';

import { admin } from '../../src/common';
import { generateUniqueId } from '../generate-unique-id';

interface INotificationPayload {
  title: string;
  body: string;
  data?: Record<string, any>;
}

interface INotification extends INotificationPayload {
  id?: string;
  createdAt: FirebaseFirestore.Timestamp;
  type: 'global' | 'individual';
  isRead: boolean;
  sender?: string;
}

interface IGlobalNotification extends INotification {
  type: 'global';
}

interface IUserNotification extends INotification {
  type: 'individual';
  userId: string;
}

const BATCH_SIZE = 500;

export const storeIndividualUserNotification = async (
  userId: string,
  data: INotificationPayload,
) => {
  const userNotification: IUserNotification = {
    ...data,
    type: 'individual',
    userId,
    createdAt: admin.firestore.Timestamp.now(),
    isRead: false,
    // id: generateUniqueId(),
  };

  try {
    return await admin
      .firestore()
      .collection('notifications')
      .add(userNotification);
  } catch (error) {
    console.error('Error storing individual user notification:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to send notification',
      error,
    );
  }
};

// Helper functions for storing notifications
export const storeGlobalNotification = async (
  data: INotificationPayload,
  senderId: string,
) => {
  const globalNotification: IGlobalNotification = {
    ...data,
    type: 'global',
    createdAt: admin.firestore.Timestamp.now(),
    isRead: false,
    sender: senderId,
    id: generateUniqueId(),
  };

  try {
    return await admin
      .firestore()
      .collection('notifications')
      .add(globalNotification);
  } catch (error) {
    console.error('Error storing global notification:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to send notification',
      error,
    );
  }
};

export const createUserNotificationReferences = async (
  userIds: string[],
  title: string,
  body: string,
) => {
  const batches: FirebaseFirestore.WriteBatch[] = [];
  let currentBatch = admin.firestore().batch();
  let operationCount = 0;

  for (const userId of userIds) {
    const userNotifRef = admin.firestore().collection('notifications').doc();

    currentBatch.set(userNotifRef, {
      userId,
      type: 'global',
      isRead: false,
      createdAt: admin.firestore.Timestamp.now(),
      id: userNotifRef.id,
      title,
      body,
    });

    operationCount++;

    if (operationCount === BATCH_SIZE) {
      batches.push(currentBatch);
      currentBatch = admin.firestore().batch();
      operationCount = 0;
    }
  }

  if (operationCount > 0) {
    batches.push(currentBatch);
  }

  // Execute all batches in parallel
  await Promise.all(batches.map((batch) => batch.commit()));
};
