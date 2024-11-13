/* eslint-disable max-lines-per-function */
import * as functions from 'firebase-functions/v1';

import { generateOptCodeTemplate } from '../utilities/email-templates/generate-otp-code-template';
import { generateVerificationCode } from '../utilities/generate-verification-code';
import { sendOtpCodeViaEmail } from '../utilities/send-otp-code-email';
import { admin } from './common';

const db = admin.firestore();

const createAnonymousAccountHandler = async (data: { userName: string }) => {
  try {
    const createdUser = await admin.auth().createUser({});
    const customToken = await admin.auth().createCustomToken(createdUser.uid);
    const createdUserDoc = db.collection('users').doc(createdUser.uid);
    await createdUserDoc.set({
      scansRemaining: 10,
      maxScans: 10,
      subscribed: false,
      isActive: true,
      isAnonymous: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      userName: data.userName,
      userId: createdUser.uid,
    });

    return {
      userId: createdUser.uid,
      authToken: customToken,
      message: 'Successfully logged in!',
      userName: data.userName,
    };
  } catch (error: any) {
    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || 'Error with creating anonymous user.',
    });
  }
};

const sendEmailVerification = async (data: { email: string }, context: any) => {
  // Ensure user is authenticated
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated.',
      );
    }

    const { email } = data;

    const uid = context.auth?.uid;
    const verificationCode = generateVerificationCode();

    await db
      .collection('users')
      .doc(uid)
      .update({
        verificationCode,
        verificationCodeExpiry: admin.firestore.Timestamp.fromDate(
          new Date(Date.now() + 15 * 60 * 1000), // 15 minutes expiry
        ),
      });

    const userDoc = db.collection('users').doc(uid);
    const userInfo = await userDoc.get();
    const userInfoData = userInfo.data();

    const usersCollection = db.collection('users');

    // Query for any document with the specified email
    const emailQuerySnapshot = await usersCollection
      .where('email', '==', email)
      .get();

    if (!email || typeof email !== 'string') {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Email is required!',
      );
    }

    // Check if any document matches the email
    if (!emailQuerySnapshot.empty) {
      throw new functions.https.HttpsError(
        'already-exists',
        'This email is already used! Please try to use another',
      );
    }

    // Check if email is already in use by another user
    const userQuery = await db
      .collection('users')
      .where('userId', '==', uid)
      .get();

    if (userQuery.empty) {
      throw new functions.https.HttpsError(
        'not-found',
        'User does not exist in SF',
      );
    }

    await sendOtpCodeViaEmail({
      receiverEmail: email,
      subject: 'X-Ray Analyzer verification code',
      htmlTemplate: generateOptCodeTemplate(
        userInfoData?.userName,
        verificationCode,
      ),
    });
    return { success: true, message: 'Successfully sent the code via email!' };
  } catch (error: any) {
    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || 'Error starting email verification.',
    });
  }
};

const verifyAuthenticationCodeHandler = async (
  data: { authenticationCode: string; email: string },
  context: any,
) => {
  try {
    // Ensure user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated.',
      );
    }

    const { authenticationCode, email } = data;
    if (!authenticationCode) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Authentication code is mandatory',
      );
    }
    if (!email || typeof email !== 'string') {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Email is required!',
      );
    }

    const uid = context.auth?.uid;

    // Check if email is already in use by another user
    const userQuery = await db
      .collection('users')
      .where('userId', '==', uid)
      .get();

    if (userQuery.empty) {
      throw new functions.https.HttpsError(
        'not-found',
        'User does not exist in SF',
      );
    }

    const docSnapshot = await db.collection('users').doc(uid).get();

    const { verificationCode, verificationCodeExpiry } =
      docSnapshot.data() as any;

    const authenticationCodeMatches = verificationCode === authenticationCode;
    const isOtpExpired = new Date() > new Date(verificationCodeExpiry);

    if (!authenticationCodeMatches) {
      throw new functions.https.HttpsError(
        'not-found',
        'This is an invalid authentication code',
      );
    }

    if (isOtpExpired) {
      throw new functions.https.HttpsError(
        'not-found',
        'Your authentication code expired! Please try to login again with your email address!',
      );
    }

    await db.collection('users').doc(uid).update({
      isAnonymous: false,
      email,
    });

    await admin.auth().updateUser(context.auth.uid, {
      email,
      emailVerified: true,
    });

    return { success: true, message: 'Successfully verified the user!' };
  } catch (error: any) {
    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || 'Error for authentication code verification',
    });
  }
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

const decrementUserScans = async (data: { userId: string }) => {
  const { userId } = data;
  const userDoc = db.collection('users').doc(userId);
  const userInfoSnapshot = await userDoc.get();

  if (!userInfoSnapshot.exists) {
    throw new functions.https.HttpsError('not-found', 'User does not exist.');
  }

  const { scansRemaining } = userInfoSnapshot.data() as {
    scansRemaining: number;
  };

  if (scansRemaining <= 0) {
    throw new functions.https.HttpsError(
      'resource-exhausted',
      'You have reached the maximum number of scans.',
    );
  }

  // Decrement the scansRemaining field
  await userDoc.update({
    scansRemaining: admin.firestore.FieldValue.increment(-1),
  });

  // Fetch the updated document to get the latest scansRemaining count
  const updatedUserData = (await userDoc.get()).data() as {
    scansRemaining: number;
  };

  return {
    scansRemaining: updatedUserData.scansRemaining,
    message: 'Successfully completed a scan!',
  };
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
  decrementUserScans,
  getUserInfo,
  incrementUserScans,
  sendEmailVerification,
  updateUserSubscription,
  verifyAuthenticationCodeHandler,
};
