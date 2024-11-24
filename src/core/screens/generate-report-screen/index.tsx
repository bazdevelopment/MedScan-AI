import React from 'react';
import { useStickyHeaderScrollProps } from 'react-native-sticky-parallax-header';

import { FinalReportForeground } from '@/components/final-report-foreground';
import { FinalReportHeader } from '@/components/final-report-header';
import ParallaxScrollView from '@/components/parallax-scrollview';
import { type ScrollView, Text, View } from '@/ui';

import { type IGenerateReportScreen } from './generate-report-screen.interface';

const PARALLAX_HEIGHT = 100;
const _HEADER_BAR_HEIGHT = 110;
const SNAP_START_THRESHOLD = 70;
const SNAP_STOP_THRESHOLD = 300;

const GenerateReportScreen = ({ collectedData }: IGenerateReportScreen) => {
  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useStickyHeaderScrollProps<ScrollView>({
    parallaxHeight: PARALLAX_HEIGHT,
    snapStartThreshold: SNAP_START_THRESHOLD,
    snapStopThreshold: SNAP_STOP_THRESHOLD,
    snapToEdge: true,
  });
  return (
    <ParallaxScrollView
      parallaxHeight={PARALLAX_HEIGHT}
      headerHeight={60}
      snapStartThreshold={SNAP_START_THRESHOLD}
      snapStopThreshold={SNAP_STOP_THRESHOLD}
      ForegroundComponent={<FinalReportForeground />}
      HeaderBarComponent={<FinalReportHeader />}
      onScroll={onScroll}
      onScrollEndDrag={onScrollEndDrag}
      scrollHeight={scrollHeight}
      scrollValue={scrollValue}
      scrollViewRef={scrollViewRef}
      onMomentumScrollEnd={onMomentumScrollEnd}
    >
      <View className="top-[-150px] ml-4">
        <Text className="my-5">Recent reports</Text>
        <Text>{collectedData.interpretationResult}</Text>
      </View>
    </ParallaxScrollView>
  );
};

export default GenerateReportScreen;
