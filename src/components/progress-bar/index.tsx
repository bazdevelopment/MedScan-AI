import { LinearGradient } from 'expo-linear-gradient';
import { useRef } from 'react';
import { Animated, View } from 'react-native';

import { colors, Text } from '@/ui';

import { type IProgressBar } from './progress-bar.interface';

/**
 *  Component which displays a progress bar which is filed dynamically depending on the number of steps
 */
const ProgressBar = ({
  currentStep = 1,
  totalSteps = 1,
  isTextShown = false,
}: IProgressBar) => {
  const progress = useRef(new Animated.Value(0)).current;

  Animated.timing(progress, {
    toValue: (currentStep / totalSteps) * 100,
    duration: 800 /* Adjust the duration as needed */,
    useNativeDriver: false,
  }).start();

  // const labelText = `${currentStep} / ${totalSteps}`;
  const labelText = `${Math.round((currentStep / totalSteps) * 100)}%`;
  return (
    <View className="w-[180px] flex-row items-center">
      <View className="h-3 flex-1 overflow-hidden rounded-full">
        <LinearGradient
          colors={[colors.primary[900], colors.primary[900]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Animated.View
            className="h-full bg-primary-900"
            style={{
              width: progress.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </LinearGradient>
      </View>
      {isTextShown && (
        <Text className="ml-5 text-center text-base font-medium text-white">
          {labelText}
        </Text>
      )}
    </View>
  );
};

export default ProgressBar;
