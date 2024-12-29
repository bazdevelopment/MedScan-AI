/* eslint-disable max-lines-per-function */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

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
  data: { startDate: string; endDate: string }, // Assuming input is in ISO 8601 format (string)
  context: any,
) => {
  try {
    // Validate authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated.',
      );
    }
    const userId = context.auth?.uid;
    const { startDate, endDate } = data;

    // Validate input dates
    if (!startDate || !endDate) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'StartDate and endDate are required!',
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
        'StartDate must be before or equal to endDate.',
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
    throw new functions.https.HttpsError(
      error.code || 'internal',
      error.message || 'Failed to fetch analyses!',
      { message: error.message },
    );
  }
};

export const updateScanInterpretation = async (data: any, context: any) => {
  try {
    // Ensure the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Request not authorized. Please log in.',
      );
    }

    // Extract the `documentId` and `fieldsToUpdate` from the request data
    const { documentId, fieldsToUpdate } = data;

    // Validate input
    if (!documentId || !fieldsToUpdate || typeof fieldsToUpdate !== 'object') {
      throw new functions.https.HttpsError(
        'invalid-argument',
        "'documentId' and 'fieldsToUpdate' are required.",
      );
    }

    // Firestore collection where your records are stored
    const collectionName = 'interpretations'; // Replace with your actual collection name

    // Update the document with the provided fields
    await db.collection(collectionName).doc(documentId).update(fieldsToUpdate);

    return {
      message: 'Scan interpretation record updated successfully!',
      updatedFields: fieldsToUpdate,
    };
  } catch (error: any) {
    throw new functions.https.HttpsError(error.code, error.message, {
      message:
        error.message ||
        'An error occurred while updating the scan interpretation record.',
    });
  }
};

export const getInterpretationByDocumentId = async (
  data: any,
  context: any,
) => {
  try {
    // Ensure the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Request not authorized. Please log in.',
      );
    }

    // Extract the `documentId` from the request data
    const { documentId } = data;

    // Validate input
    if (!documentId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        "'DocumentId' is required.",
      );
    }

    // Firestore collection where your records are stored
    const collectionName = 'interpretations'; // Replace with your actual collection name

    // Get the document by ID
    const doc = await db.collection(collectionName).doc(documentId).get();

    if (!doc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        `No document found with the ID: ${documentId}`,
      );
    }

    // Return the document data
    return {
      message: 'Document retrieved successfully!',
      record: {
        ...doc.data(),
        createdAt: doc.data()?.createdAt.toDate().toISOString(),
      },
    };
  } catch (error: any) {
    throw new functions.https.HttpsError(
      error.code || 'unknown',
      error.message,
      {
        message:
          error.message ||
          'An error occurred while retrieving the interpretation by documentId.',
      },
    );
  }
};

export const getRecentInterpretationHandler = async (
  data: { limit?: number },
  context: any,
) => {
  try {
    // Ensure the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Request not authorized. Please log in.',
      );
    }

    // Extract the limit from the request data or use default value
    const { limit = 5 } = data;

    // Validate limit
    if (typeof limit !== 'number' || limit < 1 || limit > 100) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Limit must be a number between 1 and 100',
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
        message: 'No interpretations found',
        records: [],
      };
    }

    // Transform the documents data
    const records = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toISOString(),
      };
    });

    return {
      message: 'Recent interpretations retrieved successfully!',
      records,
      total: records.length,
    };
  } catch (error: any) {
    console.error('Error in getRecentInterpretations:', error);
    throw new functions.https.HttpsError(
      error.code || 'unknown',
      error.message ||
        'An error occurred while retrieving recent interpretations.',
      {
        message: error.message || 'Internal server error occurred.',
      },
    );
  }
};
