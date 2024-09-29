/* eslint-disable max-lines-per-function */
import { StatusBar } from 'expo-status-bar';
import React, { cloneElement, useState } from 'react';
import {
  type NativeScrollEvent,
  type ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import {
  StickyHeaderScrollView,
  useStickyHeaderScrollProps,
} from 'react-native-sticky-parallax-header';

import { EndScrollPlaceholder } from '../end-scroll-placeholder';
import {
  type IParallaxScrollView,
  type IScrollCloseToBottom,
} from './parallax-scrollview.interface';

const ParallaxScrollView = ({
  parallaxHeight = 330,
  headerHeight = 110,
  snapStartThreshold = 70,
  snapStopThreshold = 330,
  ForegroundComponent,
  HeaderBarComponent,
  children,
}: IParallaxScrollView) => {
  const { width: windowWidth } = useWindowDimensions();
  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useStickyHeaderScrollProps<ScrollView>({
    parallaxHeight,
    snapStartThreshold,
    snapStopThreshold,
    snapToEdge: true,
  });

  const [shoScrollEndAnimation, setShowScrollEndAnimation] = useState(false);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  // Function to detect if the user has scrolled to the bottom
  const handleScroll = (event: NativeScrollEvent) => {
    'worklet';
    const { contentOffset, contentSize, layoutMeasurement } = event;

    if (isCloseToBottom({ layoutMeasurement, contentOffset, contentSize })) {
      runOnJS(setShowScrollEndAnimation)(true);
    }
    if (contentOffset.y < 40) {
      runOnJS(setShowScrollEndAnimation)(false);
    }
    // Call the onScroll handler from sticky header props
    onScroll(event);
  };

  return (
    <View className="flex-1">
      {/* Render Header Bar */}
      <View
        className="absolute inset-x-0 top-0 z-10 flex-1 items-center overflow-hidden bg-transparent"
        style={{
          width: windowWidth,
          height: headerHeight,
        }}
      >
        {cloneElement(HeaderBarComponent, { scrollValue })}
      </View>

      <StickyHeaderScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderHeader={() => (
          <View pointerEvents="box-none" style={{ height: scrollHeight }}>
            <StatusBar hidden />
            {cloneElement(ForegroundComponent, { scrollValue })}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-[600px]">{children}</View>
        {shoScrollEndAnimation && (
          <EndScrollPlaceholder onScrollToTop={scrollToTop} />
        )}
      </StickyHeaderScrollView>
    </View>
  );
};

export default ParallaxScrollView;

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: IScrollCloseToBottom) => {
  'worklet';
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
