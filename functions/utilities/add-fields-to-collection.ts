/**
Description
The addFieldsToCollectionHandler function is a Firebase Cloud Function designed to update an existing Firestore collection by adding one or more new fields to every document in the collection. Each field is initialized with a default value specified in the request.
This function is useful for schema migrations or when you need to add new fields to all documents in a collection without manually updating each document.

Behavior
Fetch Documents:
The function fetches all documents from the specified Firestore collection.

Batch Updates:

For each document, the function adds the new fields with their default values.
Updates are performed in batches of 500 documents to avoid exceeding Firestore limits.

Commit Updates:

Once a batch reaches 500 updates, it is committed to Firestore.
Any remaining documents are committed in a final batch.

Return Result:

If successful, the function returns a success message.
If an error occurs, it throws an internal error with details.
 */
import * as functions from 'firebase-functions/v1';

import { admin } from '../src/common';

export const addFieldsToCollectionHandler = async (
  data: {
    collectionName: string;
    fields: { [key: string]: any }; // Object of fields and their default values
  },
  context: any,
) => {
  // Ensure the request is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Only authenticated users can call this function.',
    );
  }

  const db = admin.firestore();

  // Extract parameters from the request
  const { collectionName, fields } = data;

  // Validate required parameters
  if (!collectionName || !fields || Object.keys(fields).length === 0) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Missing required parameters: collectionName or fields.',
    );
  }

  try {
    const snapshot = await db.collection(collectionName).get();
    const batch = db.batch();
    let count = 0;

    snapshot.forEach((doc) => {
      // Update the document with all fields and their default values
      batch.update(doc.ref, fields);
      count++;

      // Commit the batch every 500 documents to avoid exceeding limits
      if (count % 500 === 0) {
        batch.commit();
      }
    });

    // Commit any remaining documents in the batch
    if (count % 500 !== 0) {
      await batch.commit();
    }

    return {
      success: true,
      message: `Successfully updated '${collectionName}' with new fields.`,
    };
  } catch (error) {
    console.error('Error updating documents:', error);
    throw new functions.https.HttpsError(
      'internal',
      'An error occurred while updating documents.',
      error,
    );
  }
};
