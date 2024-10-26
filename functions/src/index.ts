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

export const createAnonymousAccount = euFuntions.https.onCall(
  userFunctions.createAnonymousAccountHandler,
);

export const incrementUserScans = euFuntions.https.onCall(
  userFunctions.incrementUserScans,
);
export const updateUserSubscription = euFuntions.https.onCall(
  userFunctions.updateUserSubscription,
);

export const getUserInfo = euFuntions.https.onCall(userFunctions.getUserInfo);
