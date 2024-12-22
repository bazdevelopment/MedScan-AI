/* eslint-disable max-lines-per-function */
import * as functions from 'firebase-functions/v1';

import { generateOptCodeTemplate } from '../utilities/email-templates/generate-otp-code-template';
import { generateVerificationCode } from '../utilities/generate-verification-code';
import { sendOtpCodeViaEmail } from '../utilities/send-otp-code-email';
import { truncateEmailAddress } from '../utilities/truncate-email-address';
import { admin } from './common';

const db = admin.firestore();

const createAnonymousAccountHandler = async (data: {
  userName: string;
  deviceUniqueId: string;
}) => {
  try {
    if (!data.deviceUniqueId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Device ID is required.',
      );
    }

    const devicesRef = admin.firestore().collection('mobileDevices');

    // Check if the device is already registered
    const deviceQuery = await devicesRef
      .where('deviceUniqueId', '==', data.deviceUniqueId)
      .get();

    if (!deviceQuery.empty) {
      throw new functions.https.HttpsError(
        'already-exists',
        'Free trial already used on this device',
      );
    }
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

const loginUserViaEmailHandler = async (data: { email: string }) => {
  try {
    if (!data.email) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Email is required.',
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Invalid email format.',
      );
    }

    const db = admin.firestore();

    // Find user by email
    const usersQuery = await db
      .collection('users')
      .where('email', '==', data.email)
      .limit(1)
      .get();

    let userId: string;
    let isNewUser = false;
    const verificationCode = generateVerificationCode();
    const verificationExpiry = admin.firestore.Timestamp.fromDate(
      new Date(Date.now() + 15 * 60 * 1000), // 15 minutes expiry
    );

    if (usersQuery.empty) {
      // Create new user if doesn't exist
      const createdUser = await admin.auth().createUser({
        email: data.email,
      });

      userId = createdUser.uid;

      isNewUser = true;

      // Create user document with initial data
      await db
        .collection('users')
        .doc(userId)
        .set({
          email: data.email,
          scansRemaining: 10,
          maxScans: 10,
          subscribed: false,
          isActive: false,
          isAnonymous: false,
          userName: truncateEmailAddress(data.email),
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          userId: userId,
          verificationCode,
          verificationCodeExpiry: verificationExpiry,
        });
    } else {
      // Update existing user with new verification code
      userId = usersQuery.docs[0].id;
      await db.collection('users').doc(userId).update({
        verificationCode,
        verificationCodeExpiry: verificationExpiry,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    const customToken = await admin.auth().createCustomToken(userId);

    // Here you would typically send the verification code via email
    // await sendVerificationEmail(data.email, verificationCode);

    await sendOtpCodeViaEmail({
      receiverEmail: data.email,
      subject: 'X-Ray Analyzer verification code',
      htmlTemplate: generateOptCodeTemplate(
        truncateEmailAddress(data.email),
        verificationCode,
      ),
    });

    return {
      userId,
      message: isNewUser
        ? 'Account created! Please check your email for verification code.'
        : 'Verification code sent to your email.',
      email: data.email,
      isNewUser,
      authToken: customToken,
    };
  } catch (error: any) {
    console.error('Auth error:', error);

    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    throw new functions.https.HttpsError(
      'internal',
      'Error processing authentication.',
      { message: error.message || 'Unknown error occurred.' },
    );
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

    return {
      success: true,
      message: 'Successfully sent the code via email!',
    };
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
      isActive: true,
      email,
    });

    await admin.auth().updateUser(context.auth.uid, {
      email,
      emailVerified: true,
    });

    return {
      success: true,
      message: 'Successfully verified the user!',
    };
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

const decrementUserScans = async (_: any, context: any) => {
  try {
    // Ensure user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated.',
      );
    }

    const uid = context.auth?.uid;

    const userDoc = db.collection('users').doc(uid);
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
  } catch (error: any) {
    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || 'Unable to update the number of scans!',
    });
  }
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

const getUserInfo = async (_: any, context: any) => {
  // Ensure user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated.',
    );
  }

  const userId = context.auth?.uid;

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
  loginUserViaEmailHandler,
  sendEmailVerification,
  updateUserSubscription,
  verifyAuthenticationCodeHandler,
};
