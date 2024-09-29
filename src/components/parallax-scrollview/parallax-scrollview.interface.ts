import { type ReactElement } from 'react';
import { type NativeScrollPoint, type NativeScrollSize } from 'react-native';

export interface IParallaxScrollView {
  parallaxHeight?: number;
  headerHeight?: number;
  snapStartThreshold?: number;
  snapStopThreshold?: number;
  ForegroundComponent: ReactElement;
  HeaderBarComponent: ReactElement;
  children: React.ReactNode;
}

export interface IScrollCloseToBottom {
  layoutMeasurement: NativeScrollSize;
  contentOffset: NativeScrollPoint;
  contentSize: NativeScrollSize;
}
