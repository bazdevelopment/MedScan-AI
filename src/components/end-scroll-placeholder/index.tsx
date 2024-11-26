import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { Button, Text } from '@/ui';

import { type IEndScrollPlaceholder } from './end-scroll-placeholder.interface';

export const EndScrollPlaceholder = ({
  onScrollToTop,
}: IEndScrollPlaceholder) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity set to 0

  // Function to trigger the fade-in animation
  const triggerFadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Fade in duration
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // Trigger the fade-in animation when the component is mounted
    triggerFadeIn();
  }, []);

  return (
    <Animated.View
      className="top-[-100] m-[40px] items-center justify-center rounded-xl bg-primary-100 p-4"
      style={[{ opacity: fadeAnim }]}
    >
      <Text className="text-xl font-bold">You're all caught up!</Text>
      <Button label="Scroll to top" onPress={onScrollToTop} />
    </Animated.View>
  );
};
