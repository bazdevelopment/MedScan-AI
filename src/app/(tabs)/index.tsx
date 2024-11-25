/* eslint-disable max-lines-per-function */
import { reports } from '__mocks__/reports';
import { useScrollToTop } from '@react-navigation/native';
import { checkForAppUpdate } from 'firebase/remote-config';
import React, { useEffect } from 'react';
import { useStickyHeaderScrollProps } from 'react-native-sticky-parallax-header';

import { useSendGlobalPushNotifications } from '@/api/push-notifications/push-notifications.hooks';
import { Foreground } from '@/components/home-foreground';
import { HomeHeaderBar } from '@/components/home-header-bar';
import ParallaxScrollView from '@/components/parallax-scrollview';
import ReportCard from '@/components/report-card';
import { usePushNotificationSetup } from '@/core/hooks/use-push-notifications-setup';
import { Button, ScrollView, Text, View } from '@/ui';

const PARALLAX_HEIGHT = 310;
const HEADER_BAR_HEIGHT = 110;
const SNAP_START_THRESHOLD = 70;
const SNAP_STOP_THRESHOLD = 330;

export default function Home() {
  const { arePushNotificationEnabled, enablePushNotifications } =
    usePushNotificationSetup(); //todo: check if here is the best place to call the hook
  // const { data } = useScanCategories();
  const { mutate: onHandleGlobalPushNotifications } =
    useSendGlobalPushNotifications();

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
          <Text className="my-5">Recent reports</Text>
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

          <Text>{MOCK_TEXT}</Text>
          <Button label="Send device token" onPress={enablePushNotifications} />
          <Button
            label="Submit notification"
            onPress={() =>
              onHandleGlobalPushNotifications({
                title: 'This is a global notification',
                body: 'This is a global notification body',
              })
            }
          />
        </View>
      </View>
    </ParallaxScrollView>
  );
}

export const MOCK_TEXT = `
Lorem ipsum dolor sit amet,  acilisi. Vestibulum tempor varius dolor, non condimentum lorem lacinia eu. Suspendisse dictum luctus facilisis. Suspendisse vehicula eget justo vitae viverra. Aenean eu augue quis massa faucibus auctor et ut metus. Praesent tincidunt risus ut ex convallis, non aliquam tortor euismod. Vestibulum congue, lorem vel vulputate tempus, enim magna eleifend orci, id semper diam orci at lorem. Curabitur eget metus faucibus neque facilisis scelerisque.

Proin in mi scelerisque, luctus ante vel, rutrum odio. Curabitur placerat sit amet dui in fringilla. Morbi bibendum feugiat ultrices. Mauris pharetra ullamcorper ante vel semper. Mauris pulvinar, purus non egestas ornare, nibh purus vestibulum enim, nec feugiat nibh orci non ante. Praesent elementum mattis elit, eget facilisis dolor. Ut eget posuere lacus, nec ultricies dolor. Nunc a nunc eu felis dictum molestie. Etiam bibendum, dolor at vestibulum ornare, nisi lorem pharetra odio, in lacinia orci mi non odio. Vestibulum quis vulputate augue, finibus elementum odio. Vestibulum quis porttitor enim, nec dapibus risus. In hac habitasse platea dictumst.

Nunc sollicitudin viverra se .
.
`;
