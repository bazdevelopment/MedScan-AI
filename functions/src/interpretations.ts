/* eslint-disable max-lines-per-function */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

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

    const results = querySnapshot.docs.map((doc) => doc.data());
    // Generate all the dates between startDate and endDate
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
