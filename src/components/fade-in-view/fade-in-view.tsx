import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import { type IFadeInView } from './fade-in-view.interface';

// A simple reusable component for fade-in animations
const FadeInView = ({
  children,
  duration = 800,
  delay = 0,
  className,
}: IFadeInView) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    Animated.timing(translateYAnim, {
      toValue: 0,
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, translateYAnim, duration, delay]);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        },
      ]}
      className={className}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;
