import axios from 'axios';
import { firebaseCloudFunctionsInstance } from 'firebase/config';

import { Env } from '@/core/env';

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

export const fetchAllUserConversations = async ({
  limit,
}: {
  limit: number;
}) => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'getAllConversations',
    )({ limit });

    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const sendConversationMessage = async ({
  userMessage,
  conversationId,
  conversationMode,
  userId,
  language,
}: {
  userMessage: string;
  conversationId: string;
  conversationMode: string;
  userId: string;
  language: string;
}) => {
  try {
    const response = await axios.post(
      Env.EXPO_PUBLIC_CONTINUE_CONVERSATION_ENDPOINT as string,
      {
        userId,
        conversationId,
        userMessage,
        conversationMode,
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
  } catch (e) {
    throw e;
  }
};
