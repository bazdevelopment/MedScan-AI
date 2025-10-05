import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';

import { queryClient } from '../common';
import {
  fetchAllUserConversations,
  fetchConversation,
  sendConversationMessage,
} from './conversation.requests';

export const useConversationHistory = (conversationId: string) => {
  return createQuery({
    queryKey: ['conversation', conversationId],
    fetcher: () => fetchConversation({ conversationId }),
    // initialData: { messages: [] }, // Default initial data
  })();
};

export const useAllUserConversations = (limit: number = 5) => {
  return createQuery({
    queryKey: ['user-conversations'],
    fetcher: () => fetchAllUserConversations({ limit }),
  })();
};

export const useConversation = (conversationId: string) => {
  // Mutation to send a new message
  const sendMessageMutation = createMutation({
    mutationFn: (variables) => sendConversationMessage(variables),
    onSuccess: () => {
      // Invalidate the conversation query to refetch the latest messages
      queryClient.invalidateQueries({
        queryKey: ['conversation', conversationId],
      });
    },
    onError: (error) => {
      Toast.error(error.response.data.message);
    },
  })();

  return {
    sendMessage: sendMessageMutation.mutateAsync,
    isSending: sendMessageMutation.isPending,
  };
};
