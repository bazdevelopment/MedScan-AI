import { type ReactElement, type RefObject } from 'react';
import {
  type NativeScrollEvent,
  type NativeScrollPoint,
  type NativeScrollSize,
  type ScrollView,
} from 'react-native';
import { type SharedValue } from 'react-native-reanimated';

export interface IParallaxScrollView {
  parallaxHeight?: number;
  headerHeight?: number;
  snapStartThreshold?: number;
  snapStopThreshold?: number;
  ForegroundComponent: ReactElement;
  HeaderBarComponent: ReactElement;
  children: React.ReactNode;
  onScroll: (e: NativeScrollEvent) => void;
  onScrollEndDrag: (e: NativeScrollEvent) => void;
  scrollHeight: number;
  scrollValue: SharedValue<number>;
  scrollViewRef: RefObject<ScrollView>;
  onMomentumScrollEnd: (e: NativeScrollEvent) => void;
}

export interface IScrollCloseToBottom {
  layoutMeasurement: NativeScrollSize;
  contentOffset: NativeScrollPoint;
  contentSize: NativeScrollSize;
}
