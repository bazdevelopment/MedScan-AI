import React from 'react';
import { useEffect, useMemo } from 'react';
import { Animated, View } from 'react-native';

import { storySkeletonStyles } from './story-skeleton.styles';

const StorySkeleton = () => {
  const animatedValue = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={storySkeletonStyles.skeletonItem}>
      <Animated.View
        style={[
          storySkeletonStyles.skeletonCircle,
          {
            opacity,
          },
        ]}
      />
      <Animated.View
        style={[
          storySkeletonStyles.skeletonText,
          {
            opacity,
          },
        ]}
      />
    </View>
  );
};

export default StorySkeleton;
