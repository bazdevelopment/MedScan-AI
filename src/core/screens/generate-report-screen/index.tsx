import React from 'react';

import { MOCK_TEXT } from '@/app/(tabs)';
import { FinalReportForeground } from '@/components/final-report-foreground';
import { FinalReportHeader } from '@/components/final-report-header';
import ParallaxScrollView from '@/components/parallax-scrollview';
import { Text, View } from '@/ui';

const PARALLAX_HEIGHT = 100;
const _HEADER_BAR_HEIGHT = 110;
const SNAP_START_THRESHOLD = 70;
const SNAP_STOP_THRESHOLD = 300;

const GenerateReportScreen = ({ collectedData }) => {
  return (
    <ParallaxScrollView
      parallaxHeight={PARALLAX_HEIGHT}
      headerHeight={60}
      snapStartThreshold={SNAP_START_THRESHOLD}
      snapStopThreshold={SNAP_STOP_THRESHOLD}
      ForegroundComponent={<FinalReportForeground />}
      HeaderBarComponent={<FinalReportHeader />}
    >
      <View className="top-[-150px] ml-4">
        <Text className="my-5">Recent reports</Text>
        <Text>{MOCK_TEXT}</Text>
      </View>
    </ParallaxScrollView>
  );
};

export default GenerateReportScreen;
