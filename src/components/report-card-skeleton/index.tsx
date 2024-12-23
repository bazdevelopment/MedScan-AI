import React, { useEffect, useMemo } from 'react';
import { Animated, View } from 'react-native';

const ReportSkeleton = () => {
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
    <View className="mx-4 my-2 h-[150] w-[300] rounded-xl bg-white py-4 shadow-sm">
      <Animated.View
        className="h-30  rounded-t-xl bg-gray-300"
        style={{ opacity }}
      />
      <View className="p-4">
        <Animated.View
          className="mb-2 h-6 w-3/5 rounded bg-gray-300"
          style={{ opacity }}
        />
        <Animated.View
          className="mb-4 h-4 w-4/5 rounded bg-gray-300"
          style={{ opacity }}
        />
        <View className="flex-row justify-between">
          <Animated.View
            className="h-4 w-1/3 rounded bg-gray-300"
            style={{ opacity }}
          />
          <Animated.View
            className="h-4 w-1/5 rounded bg-gray-300"
            style={{ opacity }}
          />
        </View>
      </View>
    </View>
  );
};

export default ReportSkeleton;
