// ParallaxScrollView.tsx
import { StatusBar } from 'expo-status-bar';
import React, { cloneElement, type ReactElement } from 'react';
import { type ScrollView, useWindowDimensions, View } from 'react-native';
import {
  StickyHeaderScrollView,
  useStickyHeaderScrollProps,
} from 'react-native-sticky-parallax-header';

type ParallaxScrollViewProps = {
  parallaxHeight?: number;
  headerHeight?: number;
  snapStartThreshold?: number;
  snapStopThreshold?: number;
  ForegroundComponent: ReactElement;
  HeaderBarComponent: ReactElement;
  children: React.ReactNode;
};

const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = ({
  parallaxHeight = 330,
  headerHeight = 110,
  snapStartThreshold = 70,
  snapStopThreshold = 330,
  ForegroundComponent,
  HeaderBarComponent,
  children,
}) => {
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

      {/* Parallax ScrollView */}
      <StickyHeaderScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        renderHeader={() => (
          <View pointerEvents="box-none" style={{ height: scrollHeight }}>
            <StatusBar hidden />
            {cloneElement(ForegroundComponent, { scrollValue })}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </StickyHeaderScrollView>
    </View>
  );
};

export default ParallaxScrollView;
