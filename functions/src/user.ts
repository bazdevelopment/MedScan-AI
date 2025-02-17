/* eslint-disable max-lines-per-function */
import * as functions from 'firebase-functions/v1';

import { generateOptCodeTemplate } from '../utilities/email-templates/generate-otp-code-template';
import { generateVerificationCode } from '../utilities/generate-verification-code';
import { sendOtpCodeViaEmail } from '../utilities/send-otp-code-email';
import { truncateEmailAddress } from '../utilities/truncate-email-address';
import { admin } from './common';
import { getTranslation } from './translations';

const db = admin.firestore();

/*
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

/*

/**
 * Handles user login via email.
 * !note: The translataion here is not mandatory because by default the language will be english and login it's one of the first screens that the user will see.
 * @param {Object} data - The data object containing the email.
 * @param {string} data.email - The email address of the user.
 * @return {Promise<Object>} The result of the login operation.
 */
const loginUserViaEmailHandler = async (data: {
  email: string;
  language: string;
}) => {
  let t;
  try {
    t = getTranslation(data.language);
    if (!data.email) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.loginUserViaEmail.mandatoryEmail,
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.loginUserViaEmail.invalidEmail,
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
          isOtpVerified: false,
          isOnboarded: false,
          userName: truncateEmailAddress(data.email),
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          userId: userId,
          verificationCode,
          verificationCodeExpiry: verificationExpiry,
          preferredLanguage: data.language || 'en',
          completedScans: 0,
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

    // Check if the email is the special email to avoid sending the verification code
    // test account is needed for apple so sending code via email is not needed
    if (data.email !== process.env.TEST_ACCOUNT) {
      await sendOtpCodeViaEmail({
        receiverEmail: data.email,
        subject: 'MedScan AI Verification Code – Complete Your Login',
        htmlTemplate: generateOptCodeTemplate(
          truncateEmailAddress(data.email),
          verificationCode,
        ),
      });
    }

    return {
      userId,
      message: isNewUser
        ? t.loginUserViaEmail.accountCreated
        : t.loginUserViaEmail.verificationCodeSent,
      email: data.email,
      isNewUser,
      authToken: customToken,
    };
  } catch (error: any) {
    t = t || getTranslation('en');

    console.error('Auth via email error:', error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    throw new functions.https.HttpsError(
      'internal',
      t.loginUserViaEmail.verificationCodeSent,
      { message: error.message || 'Unknown error occurred.' },
    );
  }
};

const sendEmailVerification = async (
  data: { email: string; language: string },
  context: any,
) => {
  // Ensure user is authenticated
  let t;
  try {
    t = getTranslation(data.language);

    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound,
      );
    }

    const { email, language } = data;
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

    const userInfoData = await getUserInfoById(uid, language);

    const usersCollection = db.collection('users');

    // Query for any document with the specified email
    const emailQuerySnapshot = await usersCollection
      .where('email', '==', email)
      .get();

    if (!email || typeof email !== 'string') {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.sendEmailVerification.emailMandatory,
      );
    }

    // Check if any document matches the email
    if (!emailQuerySnapshot.empty) {
      throw new functions.https.HttpsError(
        'already-exists',
        t.sendEmailVerification.emailUsed,
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
        t.sendEmailVerification.userNotFound,
      );
    }

    await sendOtpCodeViaEmail({
      receiverEmail: email,
      subject: 'MedScan AI verification code',
      htmlTemplate: generateOptCodeTemplate(
        userInfoData?.userName,
        verificationCode,
      ),
    });

    return {
      success: true,
      message: t.sendEmailVerification.verificationCodeSent,
    };
  } catch (error: any) {
    t = t || getTranslation('en');

    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || t.sendEmailVerification.generalError,
    });
  }
};

const verifyAuthenticationCodeHandler = async (
  data: { authenticationCode: string; email: string; language: string },
  context: any,
) => {
  let t;
  try {
    t = getTranslation(data.language);
    // Ensure user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound,
      );
    }

    const { authenticationCode, email } = data;
    if (!authenticationCode) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.verifyAuthenticationCode.authCodeMandatory,
      );
    }
    if (!email || typeof email !== 'string') {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.verifyAuthenticationCode.emailAddressMandatory,
      );
    }

    const uid = context.auth?.uid;

    // Check if email is already in use by another user
    const userQuery = await db
      .collection('users')
      .where('userId', '==', uid)
      .get();

    const docSnapshot = await db.collection('users').doc(uid).get();

    const { verificationCode, verificationCodeExpiry } =
      docSnapshot.data() as any;

    if (userQuery.empty) {
      throw new functions.https.HttpsError(
        'not-found',
        t.verifyAuthenticationCode.userNotFound,
      );
    }

    const authenticationCodeMatches = verificationCode === authenticationCode;
    const isOtpExpired =
      new Date() > new Date(verificationCodeExpiry.toDate().toISOString());

    if (isOtpExpired) {
      throw new functions.https.HttpsError(
        'not-found',
        t.verifyAuthenticationCode.authCodeExpired,
      );
    }
    if (!authenticationCodeMatches) {
      throw new functions.https.HttpsError(
        'not-found',
        t.verifyAuthenticationCode.invalidAuthCode,
      );
    }

    await db.collection('users').doc(uid).update({
      isAnonymous: false,
      isActive: true,
      email,
      isOtpVerified: true,
    });

    /* 
    !the line below is causing issue on android (500 when trying to fetch user info for the first time in tabs layout, second time or after a app refresh it works)
    */
    // await admin.auth().updateUser(context.auth.uid, {
    //   email,
    //   emailVerified: true,
    // });

    return {
      success: true,
      message: t.verifyAuthenticationCode.authCodeVerified,
    };
  } catch (error: any) {
    t = t || getTranslation('en');

    console.error('Error verifying authentication code:', error);
    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || t.verifyAuthenticationCode.generalError,
    });
  }
};

const incrementUserScans = async (data: {
  userId: string;
  language: string;
}) => {
  let t;
  try {
    const { userId, language } = data;
    const t = getTranslation(language);
    const userInfoData = await getUserInfoById(userId, language);
    const userDoc = db.collection('users').doc(userId);

    const { scans, maxScans } = userInfoData;

    if (scans >= maxScans) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        t.common.scanLimitReached,
      );
    }

    await userDoc.update({ scans: scans + 1 });

    return {
      scans: scans + 1,
      message: t.incrementUsersScans.incrementSuccessScan,
    };
  } catch (error: any) {
    t = t || getTranslation('en');

    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || t.incrementUsersScans.generalError,
    });
  }
};

const decrementUserScans = async (data: { language: string }, context: any) => {
  let t;
  try {
    t = getTranslation(data.language);
    // Ensure user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound,
      );
    }

    const uid = context.auth?.uid;

    const userDoc = db.collection('users').doc(uid);
    const userInfo = await getUserInfoById(uid, data.language);

    const { scansRemaining } = userInfo;

    if (scansRemaining <= 0) {
      throw new functions.https.HttpsError(
        'resource-exhausted',
        t.common.scanLimitReached,
      );
    }

    // Decrement the scansRemaining field
    await userDoc.update({
      scansRemaining: admin.firestore.FieldValue.increment(-1),
    });

    // Fetch the updated document to get the latest scansRemaining count
    const updatedUserData = await getUserInfoById(uid, data.language);

    return {
      scansRemaining: updatedUserData.scansRemaining,
      message: t.decrementUserScans.decrementSuccessScan,
    };
  } catch (error: any) {
    t = t || getTranslation('en');

    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || t.decrementUserScans.generalError,
    });
  }
};

const updateUserSubscription = async (data: {
  userId: string;
  language: string;
}) => {
  let t;
  try {
    const { userId, language } = data;
    const userDoc = db.collection('users').doc(userId);
    t = getTranslation(language);

    await userDoc.update({ subscribed: true, maxScans: 200 });

    return { message: t.updateUserSubscription.subscribeSuccess };
  } catch (error: any) {
    t = t || getTranslation('en');

    throw new functions.https.HttpsError(error.code, error.message, {
      message:
        error.message || t?.updateUserSubscription.updateSubscriptionError,
    });
  }
};

const updateUser = async (data: {
  userId: string;
  language: string;
  fieldsToUpdate: object;
}) => {
  let t;
  try {
    const { userId, language } = data;
    const userDoc = db.collection('users').doc(userId);
    t = getTranslation(language);

    await userDoc.update(data.fieldsToUpdate);

    return { message: t.updateUser.successUpdatedUser };
  } catch (error: any) {
    t = t || getTranslation('en');

    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || t?.updateUser.updateUserError,
    });
  }
};

const handleUpdateUserLanguage = async (
  data: { language: string },
  context: any,
) => {
  let t;
  try {
    const { language } = data;
    t = getTranslation(language);
    // Ensure user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound,
      );
    }
    if (!language) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Language code is mandatory',
      );
    }
    const uid = context.auth?.uid;
    const userDoc = db.collection('users').doc(uid);

    await userDoc.update({ preferredLanguage: language });

    return { message: t.updateUserLanguage.updateSuccess, language };
  } catch (error) {
    t = t || getTranslation('en');

    throw new functions.https.HttpsError(
      'internal',
      t.updateUserLanguage.updateError,
    );
  }
};

const getUserInfo = async (data: { language: string }, context: any) => {
  let t;
  try {
    t = getTranslation(data.language);

    // Ensure user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound,
      );
    }

    const userId = context.auth?.uid;
    const userInfoData = await getUserInfoById(userId, data.language);
    return {
      ...userInfoData,
      verificationCodeExpiry: userInfoData?.verificationCodeExpiry
        .toDate()
        .toISOString(),
      createdAt: userInfoData?.createdAt?.toDate().toISOString(),
      updatedAt: userInfoData?.updatedAt?.toDate().toISOString(),
      message: t.getUserInfo.successGetInfo,
    };
  } catch (error: any) {
    t = t || getTranslation('en');
    throw new functions.https.HttpsError(
      'internal',
      t.getUserInfo.errorGetInfo,
    );
  }
};

const getUserInfoById = async (
  userId: string,
  language: string,
): Promise<any> => {
  let t;
  try {
    t = getTranslation(language);

    // Check if userId is valid
    if (!userId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.common.userIdMissing,
      );
    }

    // Fetch the user info from the database or service
    const userInfoData = await db.collection('users').doc(userId).get();

    // Ensure user data is not null/undefined
    if (!userInfoData.exists) {
      throw new functions.https.HttpsError(
        'data-loss',
        t.getUserInfoById.noUserInfoData,
      );
    }

    // Return the user info data
    return userInfoData.data();
  } catch (error: any) {
    t = t || getTranslation('en');

    // Handle errors and rethrow as HttpsError for consistency
    if (error instanceof functions.https.HttpsError) {
      throw error; // Rethrow known HttpsError
    }

    // Log the error for debugging purposes
    console.error('Error fetching user info:', error);

    // Throw a generic error for unexpected issues
    throw new functions.https.HttpsError(
      'unknown',
      t.getUserInfoById.getUserFetchError,
      { details: error.message },
    );
  }
};

export {
  decrementUserScans,
  getUserInfo,
  getUserInfoById,
  handleUpdateUserLanguage,
  incrementUserScans,
  loginUserViaEmailHandler,
  sendEmailVerification,
  updateUser,
  updateUserSubscription,
  verifyAuthenticationCodeHandler,
};
