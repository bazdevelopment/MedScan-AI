/* eslint-disable max-lines-per-function */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { getTranslation } from './translations';
import { getUserInfoById } from './user';

interface IInterpretationResult {
  docId: string; // Firestore document ID
  userId: string;
  title: string;
  createdAt: FirebaseFirestore.Timestamp; // Firestore timestamp
  url?: string;
  filePath?: string;
  interpretationResult?: string;
  mimeType?: string;
  promptMessage?: string;
  id: string;
}

const db = admin.firestore();

export const getInterpretationByDateHandler = async (
  data: { startDate: string; endDate: string; language: string }, // Assuming input is in ISO 8601 format (string)
  context: any,
) => {
  let t;
  try {
    t = getTranslation(data.language);

    // Validate authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound,
      );
    }
    const userId = context.auth?.uid;
    const { startDate, endDate } = data;

    // Validate input dates
    if (!startDate || !endDate) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.getInterpretationByDate.startEndDateRequired,
      );
    }

    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endDate);
    // Set end date to end of the day (23:59:59.999)
    end.setUTCHours(23, 59, 59, 999);

    // Convert to Firestore Timestamps
    const startTimestamp = admin.firestore.Timestamp.fromDate(start);
    const endTimestamp = admin.firestore.Timestamp.fromDate(end);

    if (start > end) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.getInterpretationByDate.startDatePriority,
      );
    }

    // Fetch data from Firestore
    const analysesRef = admin.firestore().collection('interpretations');
    const querySnapshot = await analysesRef
      .where('userId', '==', userId)
      .where('createdAt', '>=', startTimestamp)
      .where('createdAt', '<=', endTimestamp)
      .orderBy('createdAt', 'asc')
      .get();

    // Generate all dates in the range (inclusive)
    const allDatesInRange: string[] = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
      // Format as YYYY-MM-DD
      const dateString = currentDate.toISOString().split('T')[0];
      allDatesInRange.push(dateString);
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Initialize record object with empty arrays
    const record: { [key: string]: any[] } = {};
    allDatesInRange.forEach((date) => {
      record[date] = [];
    });

    // Map results to dates
    querySnapshot.docs.forEach((doc) => {
      const data = doc.data() as IInterpretationResult;
      const createdAt = data.createdAt.toDate();
      // Format as YYYY-MM-DD
      const date = createdAt.toISOString().split('T')[0];

      if (Object.prototype.hasOwnProperty.call(record, date)) {
        record[date].push({
          interpretation: data.interpretationResult,
          promptMessage: data.promptMessage,
          url: data.url,
          createdAt: createdAt.toISOString(),
          id: data.id,
          mimeType: data.mimeType,
          title: data.title,
          docId: doc.id,
        });
      }
    });

    return {
      success: true,
      record,
      allDatesInRange,
    };
  } catch (error: any) {
    console.error('Error fetching user analyses:', error);
    t = t || getTranslation('en');
    throw new functions.https.HttpsError(
      error.code || 'internal',
      error.message || t.getInterpretationByDate.generalError,
      { message: error.message },
    );
  }
};

export const updateScanInterpretation = async (
  data: { language: string; documentId: string; fieldsToUpdate: object },
  context: any,
) => {
  let t;
  try {
    t = getTranslation(data.language);

    // Ensure the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound,
      );
    }

    // Extract the `documentId` and `fieldsToUpdate` from the request data
    const { documentId, fieldsToUpdate } = data;

    // Validate input
    if (!documentId || !fieldsToUpdate || typeof fieldsToUpdate !== 'object') {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.updateScanInterpretation.paramsRequired,
      );
    }

    const uid = context.auth?.uid;
    // to check if user is detected
    await getUserInfoById(uid, data.language);

    // Firestore collection where your records are stored
    const collectionName = 'interpretations'; // Replace with your actual collection name

    // Update the document with the provided fields
    await db.collection(collectionName).doc(documentId).update(fieldsToUpdate);

    return {
      success: true,
      message: t.updateScanInterpretation.success,
      updatedFields: fieldsToUpdate,
    };
  } catch (error: any) {
    t = t || getTranslation('en');

    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || t.updateScanInterpretation.generalError,
    });
  }
};

export const deleteScanInterpretationById = async (
  data: { language: string; documentId: string },
  context: any,
) => {
  let t;
  try {
    t = getTranslation(data.language);

    // Ensure the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound,
      );
    }

    // Extract the `documentId` from the request data
    const { documentId } = data;

    // Validate input
    if (!documentId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.deleteScanInterpretation.documentIdRequired,
      );
    }

    const uid = context.auth?.uid;
    // Check if the user is detected
    await getUserInfoById(uid, data.language);

    // Firestore collection where your records are stored
    const collectionName = 'interpretations'; // Replace with your actual collection name
    const interpretationResult = await db
      .collection(collectionName)
      .doc(documentId)
      .get();
    const conversationId = interpretationResult?.data()?.conversationId;

    // Delete the conversation
    if (conversationId)
      await db.collection('conversations').doc(conversationId).delete();
    // Delete the document with the provided documentId
    if (documentId)
      await db.collection(collectionName).doc(documentId).delete();

    return {
      success: true,
      message: t.deleteScanInterpretation.success,
    };
  } catch (error: any) {
    t = t || getTranslation('en');

    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || t.deleteScanInterpretation.generalError,
    });
  }
};

export const getInterpretationByDocumentId = async (
  data: { language: string; documentId: string },
  context: any,
) => {
  let t;
  try {
    t = getTranslation(data.language);

    // Ensure the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound,
      );
    }

    // Extract the `documentId` from the request data
    const { documentId, language } = data;
    const uid = context.auth.uid;
    // to check if user is detected
    await getUserInfoById(uid, language);
    // Validate input
    if (!documentId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.getInterpretationByDocumentId.paramsRequired,
      );
    }

    // Firestore collection where your records are stored
    const collectionName = 'interpretations'; // Replace with your actual collection name

    // Get the document by ID
    const doc = await db.collection(collectionName).doc(documentId).get();
    const interpretationResult = doc.data();
    const conversationId = interpretationResult?.conversationId;
    if (!doc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        `${t.getInterpretationByDocumentId.noDocIdFound} ${documentId}`,
      );
    }

    const conversationResult = await db
      .collection('conversations')
      .doc(conversationId)
      .get();

    const conversationMessages = conversationResult?.data()?.messages;

    // Return the document data
    return {
      success: true,
      message: t.getInterpretationByDocumentId.success,
      record: {
        ...interpretationResult,
        conversationMessages,
        createdAt: doc.data()?.createdAt.toDate().toISOString(),
      },
    };
  } catch (error: any) {
    t = t || getTranslation('en');

    throw new functions.https.HttpsError(
      error.code || 'unknown',
      error.message,
      {
        message: error.message || t.getInterpretationByDocumentId.generalError,
      },
    );
  }
};

export const getRecentInterpretationHandler = async (
  data: { limit?: number; language: string },
  context: any,
) => {
  let t;
  try {
    t = getTranslation(data.language);

    // Ensure the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound,
      );
    }

    const uid = context.auth.uid;
    const userInfo = await getUserInfoById(uid, data.language);
    t = getTranslation(userInfo.preferredLanguage);

    // Extract the limit from the request data or use default value
    const { limit = 5 } = data;

    // Validate limit
    if (typeof limit !== 'number' || limit < 1 || limit > 100) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        t.getRecentInterpretation.limitRequired,
      );
    }

    // Firestore collection reference
    const collectionName = 'interpretations';

    // Query the most recent interpretations
    const querySnapshot = await db
      .collection(collectionName)
      .where('userId', '==', context.auth.uid) // Assuming you want to get only user's interpretations
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    if (querySnapshot.empty) {
      return {
        message: t.getRecentInterpretation.noInterpretationFound,
        records: [],
        success: true,
      };
    }

    // // Transform the documents data
    // const records = querySnapshot.docs.map((doc) => {
    //   const data = doc.data();
    //   return {
    //     ...data,
    //     id: doc.id,
    //     docId: doc.id,
    //     createdAt: data.createdAt.toDate().toISOString(),
    //     interpretation: data.interpretationResult,
    //     conversationMessages: data.conversationMessages,
    //   };
    // });

    // Transform the documents data
    const records = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();

        // Fetch conversation messages from the conversations collection
        const conversationDoc = await db
          .collection('conversations')
          .doc(data.conversationId)
          .get();

        const conversationData = conversationDoc.exists
          ? conversationDoc.data()
          : null;
        const conversationMessages = conversationData
          ? conversationData.messages
          : [];

        return {
          ...data,
          id: doc.id,
          docId: doc.id,
          createdAt: data.createdAt.toDate().toISOString(),
          interpretation: data.interpretationResult,
          conversationMessages, // Add conversation messages to the record
        };
      }),
    );

    return {
      message: t.getRecentInterpretation.success,
      records,
      total: records.length,
      success: true,
    };
  } catch (error: any) {
    t = t || getTranslation('en');

    console.error('Error in getRecentInterpretations:', error);
    throw new functions.https.HttpsError(
      error.code || 'unknown',
      error.message || t.getRecentInterpretation.generalError,
      {
        message:
          error.message || t.getRecentInterpretation.generalErrorAdditional,
      },
    );
  }
};
