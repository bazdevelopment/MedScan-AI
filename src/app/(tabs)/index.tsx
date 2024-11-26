/* eslint-disable max-lines-per-function */
import { reports } from '__mocks__/reports';
import { useScrollToTop } from '@react-navigation/native';
import { checkForAppUpdate } from 'firebase/remote-config';
import React, { useEffect } from 'react';
import { useStickyHeaderScrollProps } from 'react-native-sticky-parallax-header';

import { useScanCategories } from '@/api/scan-categories/scan-categories.hooks';
import { Foreground } from '@/components/home-foreground';
import { HomeHeaderBar } from '@/components/home-header-bar';
import ParallaxScrollView from '@/components/parallax-scrollview';
import ReportCard from '@/components/report-card';
import ScanCategoriesStories from '@/components/scan-category-stories';
import { usePushNotificationSetup } from '@/core/hooks/use-push-notifications-setup';
import { ScrollView, Text, View } from '@/ui';

const PARALLAX_HEIGHT = 310;
const HEADER_BAR_HEIGHT = 110;
const SNAP_START_THRESHOLD = 70;
const SNAP_STOP_THRESHOLD = 330;

export default function Home() {
  const { arePushNotificationEnabled, enablePushNotifications } =
    usePushNotificationSetup(); //todo: check if here is the best place to call the hook

  // const { mutate: onHandleGlobalPushNotifications } =
  //   useSendGlobalPushNotifications();
  const { data, isPending: areScanCategoriesLoading } = useScanCategories();

  checkForAppUpdate();

  useEffect(() => {
    if (!arePushNotificationEnabled) {
      enablePushNotifications();
    }
  }, [arePushNotificationEnabled, enablePushNotifications]);
  // Set an initializing state whilst Firebase connects

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

  useScrollToTop(scrollViewRef);

  return (
    <ParallaxScrollView
      headerHeight={HEADER_BAR_HEIGHT}
      ForegroundComponent={<Foreground />}
      HeaderBarComponent={<HomeHeaderBar />}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScroll={onScroll}
      onScrollEndDrag={onScrollEndDrag}
      scrollHeight={scrollHeight}
      scrollValue={scrollValue}
      scrollViewRef={scrollViewRef}
    >
      <View>
        <View className="ml-4 mt-14">
          <Text className="my-6">Scan examples</Text>

          <ScanCategoriesStories
            categories={data?.categories}
            isLoading={areScanCategoriesLoading}
          />
          <Text className="my-6">Recent reports</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-4"
            snapToInterval={300}
            snapToAlignment={'center'}
            decelerationRate={0}
          >
            {reports.map(({ title, date, description, score, id }) => (
              <ReportCard
                key={id}
                title={title}
                date={date}
                description={description}
                score={score}
              />
            ))}
          </ScrollView>

          {/* <Button label="Send device token" onPress={enablePushNotifications} />
          <Button
            label="Submit notification"
            onPress={() =>
              onHandleGlobalPushNotifications({
                title: 'This is a global notification',
                body: 'This is a global notification body',
              })
            }
          /> */}
        </View>
      </View>
    </ParallaxScrollView>
  );
}
