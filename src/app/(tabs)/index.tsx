/* eslint-disable max-lines-per-function */
import { useScrollToTop } from '@react-navigation/native';
import { checkForAppUpdate } from 'firebase/remote-config';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { useStickyHeaderScrollProps } from 'react-native-sticky-parallax-header';

import { useRecentInterpretations } from '@/api/interpretation/interpretation.hooks';
import { useScanCategories } from '@/api/scan-categories/scan-categories.hooks';
import { useUser } from '@/api/user/user.hooks';
import EdgeCaseTemplate from '@/components/edge-case-template';
import { Foreground } from '@/components/home-foreground';
import { HomeHeaderBar } from '@/components/home-header-bar';
import ParallaxScrollView from '@/components/parallax-scrollview';
import PullToRefresh from '@/components/pull-to-refresh';
import ReportCard from '@/components/report-card';
import ReportSkeleton from '@/components/report-card-skeleton';
import ScanCategoriesStories from '@/components/scan-category-stories';
import { useHaptic } from '@/core/hooks/use-haptics';
import { usePushNotificationSetup } from '@/core/hooks/use-push-notifications-setup';
import {
  type IInterpretationResult,
  type IInterpretationResultRecords,
} from '@/types/interpretation-report';
import { ActivityIndicator, colors, ScrollView, Text, View } from '@/ui';
import { NoReports } from '@/ui/assets/illustrations';

const PARALLAX_HEIGHT = 310;
const HEADER_BAR_HEIGHT = 110;
const SNAP_START_THRESHOLD = 70;
const SNAP_STOP_THRESHOLD = 330;

export default function Home() {
  const { arePushNotificationEnabled, enablePushNotifications } =
    usePushNotificationSetup(); //todo: check if here is the best place to call the hook

  const {
    data: recentInterpretations,
    refetch: refetchRecentReports,
    isPending: areRecentReportsLoading,
  } = useRecentInterpretations({
    limit: 5,
  })();

  const { refetch: refetchUserInfo } = useUser();

  const { colorScheme } = useColorScheme();
  const addSelectionHapticEffect = useHaptic('selection');

  const isDark = colorScheme === 'dark';

  const onFullSync = () => {
    addSelectionHapticEffect?.();
    refetchRecentReports();
    refetchUserInfo();
  };

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
    <PullToRefresh
      onRefresh={onFullSync}
      refreshingComponent={
        <View
          style={{
            paddingBottom: 20,
            paddingTop: 10,
          }}
        >
          <ActivityIndicator
            size="small"
            color={isDark ? colors.white : colors.black}
          />
        </View>
      }
    >
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
        <View className="ml-4 mt-14">
          <Text className="my-6">Scan examples</Text>

          <ScanCategoriesStories
            categories={data?.categories}
            isLoading={areScanCategoriesLoading}
          />
          <Text className="my-6">Recent reports</Text>

          <ReportsScrollableList
            areRecentReportsLoading={areRecentReportsLoading}
            recentInterpretations={recentInterpretations}
          />
        </View>
      </ParallaxScrollView>
    </PullToRefresh>
  );
}

const ReportsScrollableList = ({
  areRecentReportsLoading,
  recentInterpretations,
}: {
  areRecentReportsLoading: boolean;
  recentInterpretations: IInterpretationResultRecords;
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-4"
      snapToInterval={300}
      snapToAlignment="center"
      decelerationRate={0}
    >
      {areRecentReportsLoading ? (
        <ReportSkeleton />
      ) : !recentInterpretations?.records?.length ? (
        <EdgeCaseTemplate
          additionalClassName="mt-4 ml-[-10]"
          image={
            <NoReports width={100} height={100} fill={colors.danger[500]} />
          }
          title="No reports yet!"
        />
      ) : (
        recentInterpretations?.records?.map(
          ({
            title,
            createdAt,
            interpretationResult,
            id,
          }: IInterpretationResult) => (
            <ReportCard
              key={id}
              title={title}
              date={createdAt}
              description={interpretationResult}
            />
          ),
        )
      )}
    </ScrollView>
  );
};
