import React from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const SkeletonLoader = () => {
  // Animation setup
  const opacity = useSharedValue(0.5);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0.5, { duration: 500 }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Skeleton item component

  return (
    <View className="mt-8 flex-1">
      <SkeletonItem animatedStyle={animatedStyle} />
      <SkeletonItem animatedStyle={animatedStyle} />
      <SkeletonItem animatedStyle={animatedStyle} />
      <SkeletonItem animatedStyle={animatedStyle} />
      <SkeletonItem animatedStyle={animatedStyle} />
      <SkeletonItem animatedStyle={animatedStyle} />
    </View>
  );
};

const SkeletonItem = ({ hasRecord = false, animatedStyle }) => (
  <View className="px-4 py-3">
    <Text className="mb-2 text-xl font-semibold text-gray-800">
      <Animated.View
        style={animatedStyle}
        className="h-7 w-[300] rounded-md bg-gray-200"
      />
    </Text>

    <Animated.View
      style={animatedStyle}
      className="mt-2 h-16 w-full rounded-md bg-gray-200"
    />
  </View>
);

export default SkeletonLoader;
