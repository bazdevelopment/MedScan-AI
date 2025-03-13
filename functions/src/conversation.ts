import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const getConversationHandler = async (
  data: { conversationId: string },
  context: any,
) => {
  // Ensure the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Authentication is required to fetch the conversation.',
    );
  }

  // Extract conversationId from data payload
  const conversationId = data.conversationId;

  if (!conversationId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'conversationId is required.',
    );
  }

  try {
    // Fetch the conversation document from Firestore
    const conversationDoc = await admin
      .firestore()
      .collection('conversations')
      .doc(conversationId)
      .get();

    // Check if the conversation exists
    if (!conversationDoc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'Conversation not found.',
      );
    }

    // Extract conversation data
    const conversationData = conversationDoc.data();

    // Return the conversation data
    return {
      success: true,
      conversation: conversationData,
    };
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw new functions.https.HttpsError('internal', 'Internal Server Error');
  }
};
