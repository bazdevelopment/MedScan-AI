import { router } from 'expo-router';
import { generateUniqueId } from 'functions/utilities/generate-unique-id';
import { useEffect } from 'react';

const Chat = () => {
  useEffect(() => {
    router.navigate({
      pathname: '/chat-screen',
      params: {
        conversationId: generateUniqueId(),
        mediaSource: '',
        mimeType: '',
        conversationMode: 'RANDOM_CONVERSATION',
      },
    });
  }, []);
  return null;
};

export default Chat;
