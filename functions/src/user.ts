import * as functions from 'firebase-functions/v1';

import { admin } from './common';

const db = admin.firestore();

const createAnonymousAccountHandler = async (data: { userName: string }) => {
  const createdUser = await admin.auth().createUser({});

  const createdUserDoc = db.collection('users').doc(createdUser.uid);
  await createdUserDoc.set({
    scans: 0,
    maxScans: 10,
    subscribed: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    userName: data.userName,
  });

  return {
    userId: createdUser.uid,
    message: 'Successfully logged in!',
    userName: data.userName,
  };
};

const incrementUserScans = async (data: { userId: string }) => {
  const { userId } = data;
  const userDoc = db.collection('users').doc(userId);
  const userInfo = await userDoc.get();

  if (!userInfo.exists) {
    throw new functions.https.HttpsError('not-found', 'User does not exist.');
  }

  const { scans, maxScans } = userInfo.data() as {
    scans: string;
    maxScans: string;
  };
  if (scans >= maxScans) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'Max scan limit reached.',
    );
  }

  await userDoc.update({ scans: scans + 1 });

  return { scans: scans + 1, message: 'Successfully scanned on more time!' };
};

const updateUserSubscription = async (data: { userId: string }) => {
  const { userId } = data;
  const userDoc = db.collection('users').doc(userId);
  const userInfo = await userDoc.get();

  if (!userInfo.exists) {
    throw new functions.https.HttpsError('not-found', 'User does not exist.');
  }

  await userDoc.update({ subscribed: true, maxScans: 200 });

  return { message: 'Successfully subscribed!' };
};

const getUserInfo = async (data: { userId: string }) => {
  const { userId } = data;
  const userDoc = db.collection('users').doc(userId);
  const userInfo = await userDoc.get();
  if (!userInfo.exists) {
    throw new functions.https.HttpsError('not-found', 'User does not exist.');
  }

  const userInfoData = userInfo.data();
  return { ...userInfoData, message: 'Successfully fetched userInfo data' };
};

export {
  createAnonymousAccountHandler,
  getUserInfo,
  incrementUserScans,
  updateUserSubscription,
};
