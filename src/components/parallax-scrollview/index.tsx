/* eslint-disable max-lines-per-function */
import React, { cloneElement, useState } from 'react';
import {
  type NativeScrollEvent,
  StatusBar,
  useWindowDimensions,
  View,
} from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { StickyHeaderScrollView } from 'react-native-sticky-parallax-header';

import { EndScrollPlaceholder } from '../end-scroll-placeholder';
import {
  type IParallaxScrollView,
  type IScrollCloseToBottom,
} from './parallax-scrollview.interface';

const ParallaxScrollView = ({
  headerHeight = 110,
  ForegroundComponent,
  HeaderBarComponent,
  children,
  onScroll,
  onScrollEndDrag,
  scrollHeight,
  scrollValue,
  scrollViewRef,
  onMomentumScrollEnd,
}: IParallaxScrollView) => {
  const { width: windowWidth } = useWindowDimensions();

  const [showScrollEndAnimation, setShowScrollEndAnimation] = useState(false);
  const [isHeaderPrio, setIsHeaderPrio] = useState(scrollValue.value !== 0);

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

    /**
     * check if the scroll is performed so we know to decrease zIndex otherwise the buttons won't work
     * 5 is just a reference
     */
    if (contentOffset.y > 5) {
      runOnJS(setIsHeaderPrio)(true);
    }
    if (contentOffset.y < 5) {
      runOnJS(setIsHeaderPrio)(false);
    }

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
        className={`absolute inset-x-0 items-center overflow-hidden ${isHeaderPrio ? 'z-10' : 'z-0'}`}
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
          <View style={{ height: scrollHeight }}>
            <StatusBar hidden />
            {cloneElement(ForegroundComponent, { scrollValue })}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-[250px] mt-14">{children}</View>
        {showScrollEndAnimation && (
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
