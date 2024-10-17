import {
  type GestureEvent,
  type PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

export interface ISwipeGestureWrapper {
  child: JSX.Element;
  swipeRightAction?: () => void;
  swipeLeftAction?: (newValue?: boolean[]) => void;
}

export interface ISwipeGesturePayload {
  event: GestureEvent<PanGestureHandlerEventPayload>;
  isFirstSwipe: boolean;
  swipeRightAction?: () => void;
  swipeLeftAction?: () => void;
}
