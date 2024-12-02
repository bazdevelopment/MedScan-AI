import { useRef, useState } from 'react';
import { Animated, PanResponder } from 'react-native';

import { DEVICE_DIMENSIONS } from '@/constants/device-dimentions';
import { type TPositions } from '@/constants/positions';

const SWIPE_THRESHOLD = 100;
const screenWidth = DEVICE_DIMENSIONS.DEVICE_WIDTH;

export const useWeekPanSwipe = ({
  onChangeWeekOffset,
}: {
  onChangeWeekOffset: (direction: TPositions) => void;
}) => {
  const pan = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10;
      },
      onPanResponderMove: Animated.event([null, { dx: pan }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (isAnimating) return;

        const { dx } = gestureState;
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          setIsAnimating(true);

          Animated.timing(pan, {
            toValue: dx > 0 ? screenWidth : -screenWidth,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            pan.setValue(0);
            setIsAnimating(false);
            onChangeWeekOffset(dx > 0 ? 'left' : 'right');
          });
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;
  return { panResponder };
};
