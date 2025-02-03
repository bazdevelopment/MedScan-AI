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
    <View className="my-2 w-full rounded-xl bg-white py-2 dark:bg-blackBeauty">
      <View className="ml-4 flex-row items-center">
        <View className="flex-2">
          <Animated.View
            className="h-[70] w-[70] rounded-xl bg-gray-300"
            style={{ opacity }}
          />
        </View>
        <View className="flex-1">
          <View className="p-4">
            <Animated.View
              className="mb-2 h-4 w-3/5 rounded bg-gray-300"
              style={{ opacity }}
            />
            <Animated.View
              className="mb-4 h-4 w-4/5 rounded bg-gray-300"
              style={{ opacity }}
            />
            <Animated.View
              className="w-5/5 h-4 rounded bg-gray-300"
              style={{ opacity }}
            />
            <Animated.View
              className="mt-2 h-4 w-full rounded bg-gray-300"
              style={{ opacity }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReportSkeleton;
