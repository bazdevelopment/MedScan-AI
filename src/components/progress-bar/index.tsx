import { useRef } from 'react';
import { Animated, View } from 'react-native';

import { Text } from '@/ui';

import { type IProgressBar } from './progress-bar.interface';

/**
 *  Component which displays a progress bar which is filed dynamically depending on the number of steps
 */
const ProgressBar = ({
  currentStep = 1,
  totalSteps = 1,
  isTextShown = false,
  className = '',
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
    <View className={`w-[75%] flex-row items-center ${className}`}>
      <View className="h-3 flex-1 overflow-hidden rounded-full">
        <View className="bg-primary-100">
          <Animated.View
            className="h-full bg-primary-900"
            style={{
              width: progress.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </View>
      </View>
      {isTextShown && (
        <Text className="ml-5 text-center font-semibold-nunito text-base text-gray-500">
          {labelText}
        </Text>
      )}
    </View>
  );
};

export default ProgressBar;
