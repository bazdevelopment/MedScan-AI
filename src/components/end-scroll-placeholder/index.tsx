import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

import { translate } from '@/core';
import { Text } from '@/ui';

import { endScrollPlaceholderStyle } from './end-scoll-placeholder.styles';
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
      className="top-[-100]  items-center justify-center"
      style={[{ opacity: fadeAnim }]}
    >
      <TouchableOpacity onPress={onScrollToTop}>
        <LottieView
          source={require('assets/lottie/scroll-top-animation.json')}
          autoPlay
          loop
          style={endScrollPlaceholderStyle.scrollTopAnimation}
        />
        <Text className="top-[-30] text-center text-sm">
          {translate('components.EndScrollPlaceholder.scrollToTop')}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
