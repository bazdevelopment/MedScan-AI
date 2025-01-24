import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

import { colors } from '@/ui';

interface ProgressDotsProps {
  totalSteps: number;
  currentStep: number;
  dotSize?: number;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
}

const ProgressDots = ({
  totalSteps,
  currentStep,
  dotSize = 8,
  activeColor = colors.primary[900],
  inactiveColor = '#D1D5DB',
  className,
}: ProgressDotsProps) => {
  const animatedValues = useRef<Animated.Value[]>(
    new Array(totalSteps).fill(null).map(() => new Animated.Value(0)),
  );

  // // Update the animations when the currentStep changes
  useEffect(() => {
    animatedValues.current.forEach((value, index) => {
      Animated.spring(value, {
        toValue: index <= currentStep ? 1 : 0,
        useNativeDriver: true,
        tension: 50,
        friction: 4,
      }).start();
    });
  }, [currentStep]);

  return (
    <View className={`flex-row items-center gap-3 ${className}`}>
      {animatedValues.current.map((value, index) => (
        <Animated.View
          key={index}
          style={[
            {
              borderRadius: 100,
              width: currentStep === index ? 23 : dotSize,
              height: dotSize,
              backgroundColor:
                index <= currentStep ? activeColor : inactiveColor,
              transform: [
                {
                  scale: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.3],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

export default ProgressDots;
