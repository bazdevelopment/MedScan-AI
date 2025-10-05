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

export const getAllConversationsHandler = async (
  data: { limit?: number },
  context: any,
) => {
  // Ensure the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Authentication is required to fetch conversations.',
    );
  }

  // Extract userId from authenticated context
  const userId = context.auth.uid;

  // Extract and validate limit parameter (default to 50, max 100)
  const limit = data.limit || 5;

  try {
    // Query conversations collection filtered by userId
    const query = admin
      .firestore()
      .collection('conversations')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(limit);

    const conversationsSnapshot = await query.get();

    // Check if any conversations exist
    if (conversationsSnapshot.empty) {
      return {
        success: true,
        conversations: [],
        count: 0,
      };
    }

    // Map documents to conversation data with IDs
    const conversations = conversationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Return the conversations data
    return {
      success: true,
      conversations: conversations,
      count: conversations.length,
    };
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw new functions.https.HttpsError('internal', 'Internal Server Error');
  }
};
