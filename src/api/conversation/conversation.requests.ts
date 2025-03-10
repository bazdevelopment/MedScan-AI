import axios from 'axios';
import { firebaseCloudFunctionsInstance } from 'firebase/config';

export const fetchConversation = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'getConversation',
    )({ conversationId });
    return data.conversation;
  } catch (error) {
    throw error;
  }
};

export const sendConversationMessage = async ({
  userMessage,
  conversationId,
  userId,
  language,
}: {
  userMessage: string;
  conversationId: string;
  userId: string;
  language: string;
}) => {
  const response = await axios.post(
    'https://us-central1-x-ray-analizer-dev.cloudfunctions.net/continueConversation',
    {
      userId,
      conversationId,
      userMessage,
    },
    {
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        'Accept-Language': language,
      },
    },
  );

  return response.data;
};
