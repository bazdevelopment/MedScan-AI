import * as functions from 'firebase-functions/v1';

import { privacyPolicy } from '../utilities/privacy-policy-structure';
import { admin } from './common';

export const uploadPrivacyPolicyHandler = async (data: any, context: any) => {
  try {
    // todo add a logic for this function to be called only by the admin

    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Authentication required',
      );
    }

    const db = admin.firestore();

    // Save the terms of service data to Firestore
    await db.collection('privacy-policy').doc('latest').set(privacyPolicy);

    return {
      success: true,
      message: 'Privacy policy successfully uploaded',
    };
  } catch (error: any) {
    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || 'Error when uploading terms of service',
    });
  }
};

export const getPrivacyPolicyHandler = async (data: any, context: any) => {
  try {
    // todo add a logic for this function to be called only by the admin

    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Authentication required',
      );
    }

    const db = admin.firestore();

    // Retrieve the document from the "privacy-policy` collection
    const doc = await db.collection('privacy-policy').doc('latest').get();

    // Check if the document exists
    if (!doc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'Terms of service not found',
      );
    }

    // Return the Terms of Service as JSON
    return {
      success: true,
      record: doc.data(),
    };
  } catch (error: any) {
    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || 'Error when uploading terms of service',
    });
  }
};
