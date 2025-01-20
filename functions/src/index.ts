/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as logger from 'firebase-functions/logger';
import * as functions from 'firebase-functions/v1';

import * as imageFunctions from './image';
import {
  getInterpretationByDateHandler,
  getInterpretationByDocumentId,
  getRecentInterpretationHandler,
  updateScanInterpretation,
} from './interpretations';
import {
  getPrivacyPolicyHandler,
  uploadPrivacyPolicyHandler,
} from './privacy-policy';
import * as pushNotificationsFunctions from './push-notifications';
import {
  getScanCategoriesHandler,
  handleUploadScanCategories,
} from './scan-categories';
import {
  getTermsOfServiceHandler,
  uploadTermsOfServiceHandler,
} from './terms-of-service';
import * as userFunctions from './user';

const euFuntions = functions.region('europe-west1');

export const getHelloWorld = functions
  .region('europe-west1') // Specify the region here
  .https.onCall((data, context) => {
    logger.info('Hello logs!', { structuredData: true });
    const req = context.rawRequest;
    const authorizationHeader = req.get('Authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'The function must be called while authenticated.',
      );
    }
    return { message: data }; // Return a JSON response
  });

// export const createAnonymousAccount = euFuntions.https.onCall(
//   userFunctions.createAnonymousAccountHandler,
// );

export const loginUserViaEmail = euFuntions.https.onCall(
  userFunctions.loginUserViaEmailHandler,
);

// export const incrementUserScans = euFuntions.https.onCall(
//   userFunctions.incrementUserScans,
// );
export const decrementUserScans = euFuntions.https.onCall(
  userFunctions.decrementUserScans,
);
export const updateUserSubscription = euFuntions.https.onCall(
  userFunctions.updateUserSubscription,
);

export const updateUser = euFuntions.https.onCall(userFunctions.updateUser);

export const sendVerificationCodeViaEmail = euFuntions.https.onCall(
  userFunctions.sendEmailVerification,
);

export const verifyAuthenticationCode = euFuntions.https.onCall(
  userFunctions.verifyAuthenticationCodeHandler,
);

export const getUserInfo = euFuntions.https.onCall(userFunctions.getUserInfo);

export const updatePreferredLanguage = euFuntions.https.onCall(
  userFunctions.handleUpdateUserLanguage,
);

export const storeDeviceToken = euFuntions.https.onCall(
  pushNotificationsFunctions.storeDeviceToken,
);

export const getDeviceInfoByUniqueIdentifier = euFuntions.https.onRequest(
  pushNotificationsFunctions.checkDeviceUniqueIdentifier,
);

export const sendGlobalPushNotifications = euFuntions.https.onCall(
  pushNotificationsFunctions.handleSendGlobalPushNotifications,
);
export const sendIndividualPushNotification = euFuntions.https.onCall(
  pushNotificationsFunctions.sendUserPushNotification,
);

export const fetchUserNotifications = euFuntions.https.onCall(
  pushNotificationsFunctions.handleGetUserNotification,
);

export const markNotificationAsRead = euFuntions.https.onCall(
  pushNotificationsFunctions.handleMarkNotificationAsRead,
);
export const analyzeImage = euFuntions.https.onRequest(
  imageFunctions.analyzeImage,
);
/** Make sure you use onRequest instead of onCall for analyzeVideo function because onCall do not support FormData */
export const analyzeVideo = euFuntions.https.onRequest(
  imageFunctions.analyzeVideo,
);
/** Get scan categories together with images*/
export const getScanCategories = euFuntions.https.onCall(
  getScanCategoriesHandler,
);
/** Get scan categories together with images*/
export const uploadScanCategories = euFuntions.https.onRequest(
  handleUploadScanCategories,
);

/** Get interpretations by date for logged in user */
export const getInterpretationByDate = euFuntions.https.onCall(
  getInterpretationByDateHandler,
);

export const updateInterpretation = euFuntions.https.onCall(
  updateScanInterpretation,
);

export const getInterpretationById = euFuntions.https.onCall(
  getInterpretationByDocumentId,
);

export const getRecentInterpretations = euFuntions.https.onCall(
  getRecentInterpretationHandler,
);

export const uploadTermsOfService = euFuntions.https.onCall(
  uploadTermsOfServiceHandler,
);

export const getTermsOfService = euFuntions.https.onCall(
  getTermsOfServiceHandler,
);

export const uploadPrivacyPolicy = euFuntions.https.onCall(
  uploadPrivacyPolicyHandler,
);

export const getPrivacyPolicy = euFuntions.https.onCall(
  getPrivacyPolicyHandler,
);
