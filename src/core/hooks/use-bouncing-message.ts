import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

export const useBouncingMessage = (messages: string[]) => {
  const [loadingMessage, setLoadingMessage] = useState(messages[0]);
  const fadeValue = useRef(new Animated.Value(1)).current;
  const messageIndex = useRef(0);

  useEffect(() => {
    if (messages.length === 0) return;

    const animateNextMessage = () => {
      // Fade out
      Animated.timing(fadeValue, {
        toValue: 0,
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }).start(() => {
        // Update message when fully faded out
        messageIndex.current = (messageIndex.current + 1) % messages.length;
        setLoadingMessage(messages[messageIndex.current]);

        // Fade in
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }).start(() => {
          // Wait before starting next cycle
          setTimeout(animateNextMessage, 2000);
        });
      });
    };

    // Initial delay before starting animations
    const initialTimeout = setTimeout(animateNextMessage, 2000);

    return () => {
      clearTimeout(initialTimeout);
      fadeValue.stopAnimation();
    };
  }, [messages]);

  return { loadingMessage, fadeValue };
};
