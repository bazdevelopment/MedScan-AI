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
    const end = new Date(endDate);

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
      .where('createdAt', '>=', start)
      .where('createdAt', '<=', end)
      .orderBy('createdAt', 'asc')
      .get();

    const results = querySnapshot.docs.map((doc) => ({
      docId: doc.id, // Include the document ID
      ...doc.data(), // Spread the document data
    })) as IInterpretationResult[]; // Generate all the dates between startDate and endDate
    const allDatesInRange: string[] = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      allDatesInRange.push(dateString);

      // Increment the date by one day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Initialize an object to store results for each date
    const record: { [key: string]: any } = {};
    allDatesInRange.forEach((date) => {
      record[date] = null; // Default to null for each date
    });

    // Map results to the record object, replacing null with actual data for dates that have records
    results.forEach((item) => {
      const createdAt = item.createdAt.toDate();
      const date = createdAt.toISOString().split('T')[0]; // Format as YYYY-MM-DD

      // If the date exists in the range, update it with the workout data
      if (record[date] !== undefined) {
        if (record[date] === null) {
          record[date] = []; // Initialize an empty array if it's the first record
        }
        record[date].push({
          interpretation: item.interpretationResult,
          promptMessage: item.promptMessage,
          url: item.url,
          createdAt: createdAt.toISOString(),
          id: item.id,
          mimeType: item.mimeType,
          title: item.title,
          docId: item.docId,
        });
      }
    });

    return {
      success: true,
      record,
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
