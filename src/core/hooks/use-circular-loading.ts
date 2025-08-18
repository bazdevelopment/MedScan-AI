import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

export const useCircularLoading = (duration = 3000) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);
    setIsComplete(false);
    animatedValue.setValue(0);

    // Progress animation
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setIsComplete(true);
      setIsLoading(false);
    });
  };

  const resetLoading = () => {
    setIsLoading(true);
    setProgress(0);
    setIsComplete(false);
    animatedValue.setValue(0);
    startLoading();
  };

  // Start loading automatically when hook mounts
  useEffect(() => {
    startLoading();
  }, []);

  // Update progress percentage
  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => {
      setProgress(Math.round(value * 100));
    });

    return () => animatedValue.removeListener(listener);
  }, []);

  return {
    isLoading,
    progress,
    isComplete,
    animatedValue,
    startLoading,
    resetLoading,
  };
};
