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

import { addFieldsToCollectionHandler } from '../utilities/add-fields-to-collection';
import * as imageFunctions from './image';
import {
  deleteScanInterpretationById,
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

const usCentralFunctions = functions.region('us-central1');

export const getHelloWorld = usCentralFunctions.https.onCall(
  (data, context) => {
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
  },
);

export const loginUserAnonymously = functions.https.onCall(
  userFunctions.loginUserAnonymouslyHandler,
);

export const loginUserViaEmail = usCentralFunctions.https.onCall(
  userFunctions.loginUserViaEmailHandler,
);
export const decrementUserScans = usCentralFunctions.https.onCall(
  userFunctions.decrementUserScans,
);
export const updateUserSubscription = usCentralFunctions.https.onCall(
  userFunctions.updateUserSubscription,
);

export const updateUser = usCentralFunctions.https.onCall(
  userFunctions.updateUser,
);

export const sendVerificationCodeViaEmail = usCentralFunctions.https.onCall(
  userFunctions.sendEmailVerification,
);

export const verifyAuthenticationCode = usCentralFunctions.https.onCall(
  userFunctions.verifyAuthenticationCodeHandler,
);

export const getUserInfo = usCentralFunctions.https.onCall(
  userFunctions.getUserInfo,
);

export const updatePreferredLanguage = usCentralFunctions.https.onCall(
  userFunctions.handleUpdateUserLanguage,
);

export const storeDeviceToken = usCentralFunctions.https.onCall(
  pushNotificationsFunctions.storeDeviceToken,
);

export const getDeviceInfoByUniqueIdentifier =
  usCentralFunctions.https.onRequest(
    pushNotificationsFunctions.checkDeviceUniqueIdentifier,
  );

export const sendGlobalPushNotifications = usCentralFunctions.https.onCall(
  pushNotificationsFunctions.handleSendGlobalPushNotifications,
);
export const sendIndividualPushNotification = usCentralFunctions.https.onCall(
  pushNotificationsFunctions.sendUserPushNotification,
);

export const fetchUserNotifications = usCentralFunctions.https.onCall(
  pushNotificationsFunctions.handleGetUserNotification,
);

export const markNotificationAsRead = usCentralFunctions.https.onCall(
  pushNotificationsFunctions.handleMarkNotificationAsRead,
);
export const analyzeImage = usCentralFunctions.https.onRequest(
  imageFunctions.analyzeImage,
);
/** Make sure you use onRequest instead of onCall for analyzeVideo function because onCall do not support FormData */
export const analyzeVideo = usCentralFunctions.https.onRequest(
  imageFunctions.analyzeVideo,
);
/** Get scan categories together with images*/
export const getScanCategories = usCentralFunctions.https.onCall(
  getScanCategoriesHandler,
);
/** Get scan categories together with images*/
export const uploadScanCategories = usCentralFunctions.https.onRequest(
  handleUploadScanCategories,
);

/** Get interpretations by date for logged in user */
export const getInterpretationByDate = usCentralFunctions.https.onCall(
  getInterpretationByDateHandler,
);

/** Delete scan report by document id */
export const deleteScanReportById = usCentralFunctions.https.onCall(
  deleteScanInterpretationById,
);

export const updateInterpretation = usCentralFunctions.https.onCall(
  updateScanInterpretation,
);

export const getInterpretationById = usCentralFunctions.https.onCall(
  getInterpretationByDocumentId,
);

export const getRecentInterpretations = usCentralFunctions.https.onCall(
  getRecentInterpretationHandler,
);

export const uploadTermsOfService = usCentralFunctions.https.onCall(
  uploadTermsOfServiceHandler,
);

export const getTermsOfService = usCentralFunctions.https.onCall(
  getTermsOfServiceHandler,
);

export const uploadPrivacyPolicy = usCentralFunctions.https.onCall(
  uploadPrivacyPolicyHandler,
);

export const getPrivacyPolicy = usCentralFunctions.https.onCall(
  getPrivacyPolicyHandler,
);

export const addFieldsToCollection = usCentralFunctions.https.onCall(
  addFieldsToCollectionHandler,
);
