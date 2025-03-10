import { createMutation, createQuery } from 'react-query-kit';

import { queryClient } from '../common';
import {
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

export const useConversation = (conversationId: string) => {
  // Mutation to send a new message
  const sendMessageMutation = createMutation({
    mutationFn: (variables) => sendConversationMessage(variables),
    onSuccess: (data) => {
      // Invalidate the conversation query to refetch the latest messages
      queryClient.invalidateQueries({
        queryKey: ['conversation', conversationId],
      });
    },
  })();

  return {
    sendMessage: sendMessageMutation.mutateAsync,
    isSending: sendMessageMutation.isPending,
  };
};
