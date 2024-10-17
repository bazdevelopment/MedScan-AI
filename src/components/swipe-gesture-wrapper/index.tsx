import { useState } from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';

import {
  type ISwipeGesturePayload,
  type ISwipeGestureWrapper,
} from './swipe-gesture-wrapper.interface';

const SwipeGestureWrapper = (props: ISwipeGestureWrapper) => {
  const { child, swipeRightAction, swipeLeftAction } = props;

  /* Keep track of the first swipe gesture */
  const [isFirstSwipe, setIsFirstSwipe] = useState(false);

  return (
    <PanGestureHandler
      onGestureEvent={(event) => {
        handleSwipeGestures({
          event,
          isFirstSwipe,
          swipeRightAction,
          swipeLeftAction,
        });
        setIsFirstSwipe(true);
      }}
      onEnded={() => setIsFirstSwipe(false)}
    >
      {child}
    </PanGestureHandler>
  );
};

const SWIPE_THRESHOLD = 600;

export const handleSwipeGestures = (
  swipeGesturePayload: ISwipeGesturePayload,
) => {
  const { event, isFirstSwipe, swipeRightAction, swipeLeftAction } =
    swipeGesturePayload;
  const { velocityX } = event.nativeEvent;
  /** velocityX > 0 = swipe right, velocityX < 0 = swipe left*/
  if (velocityX > SWIPE_THRESHOLD && !isFirstSwipe && swipeRightAction) {
    swipeRightAction();
  } else if (velocityX < -SWIPE_THRESHOLD && !isFirstSwipe && swipeLeftAction) {
    swipeLeftAction();
  }
};

export default SwipeGestureWrapper;
