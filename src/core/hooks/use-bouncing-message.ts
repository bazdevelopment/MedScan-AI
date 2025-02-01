import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

export const useBouncingMessage = (messages: string[]) => {
  const [loadingMessage, setLoadingMessage] = useState(messages[0]);

  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Update the loading message in intervals

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 2000);

    // Fade in and fade out effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(fadeValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    return () => {
      clearInterval(messageInterval);
    };
  }, [fadeValue]);

  return { loadingMessage, fadeValue };
};
