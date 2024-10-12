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
}: IProgressBar) => {
  const progress = useRef(new Animated.Value(0)).current;

  Animated.timing(progress, {
    toValue: (currentStep / totalSteps) * 100,
    duration: 800 /* Adjust the duration as needed */,
    useNativeDriver: false,
  }).start();

  const labelText = `${currentStep}/${totalSteps}`;
  return (
    <View className="w-[180px] flex-row items-center">
      <View className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
        <Animated.View
          className="h-full bg-primary-800"
          style={{
            width: progress.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          }}
        />
      </View>
      {isTextShown && (
        <Text className="ml-2 text-center text-xs font-bold">{labelText}</Text>
      )}
    </View>
  );
};

export default ProgressBar;
