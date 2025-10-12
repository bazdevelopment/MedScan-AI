/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import { useRouteInfo } from 'expo-router/build/hooks';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { useStickyHeaderScrollProps } from 'react-native-sticky-parallax-header';

import {
  useRecentInterpretations,
  useUpdateInterpretationFields,
} from '@/api/interpretation/interpretation.hooks';
import { useFetchUserNotifications } from '@/api/push-notifications/push-notifications.hooks';
import { useScanCategories } from '@/api/scan-categories/scan-categories.hooks';
import { useGetCustomerInfo } from '@/api/subscription/subscription.hooks';
import { useUser } from '@/api/user/user.hooks';
import CardWrapper from '@/components/card-wrapper';
import CustomAlert from '@/components/custom-alert';
import EdgeCaseTemplate from '@/components/edge-case-template';
import FreeTierStatus from '@/components/free-tier-status';
import { Foreground } from '@/components/home-foreground';
import { HomeHeaderBar } from '@/components/home-header-bar';
import ParallaxScrollView from '@/components/parallax-scrollview';
import PullToRefresh from '@/components/pull-to-refresh';
import ReportSkeleton from '@/components/report-card-skeleton';
import ScanCategoriesStories from '@/components/scan-category-stories';
import ScanReportCard from '@/components/scan-report-card';
import Toast from '@/components/toast';
import { translate, useIsFirstTime, useSelectedLanguage } from '@/core';
import useBackHandler from '@/core/hooks/use-back-handler';
import useCustomScrollToTop from '@/core/hooks/use-custom-scroll-to-top';
import getDeviceSizeCategory from '@/core/utilities/get-device-size-category';
import { requestAppRatingWithDelay } from '@/core/utilities/request-app-review';
import { wait } from '@/core/utilities/wait';
import {
  type IInterpretationResult,
  type IInterpretationResultRecords,
} from '@/types/interpretation-report';
import { ActivityIndicator, colors, ScrollView, Text, View } from '@/ui';
import { UploadIcon } from '@/ui/assets/icons';
import { NoReports } from '@/ui/assets/illustrations';

const PARALLAX_HEIGHT = 310;
const HEADER_BAR_HEIGHT = 180;
const SNAP_START_THRESHOLD = 70;
const SNAP_STOP_THRESHOLD = 330;

export default function Home() {
  const { language } = useSelectedLanguage();
  const { isVerySmallDevice } = getDeviceSizeCategory();

  const {
    data: recentInterpretations,
    refetch: refetchRecentReports,
    isPending: areRecentReportsLoading,
  } = useRecentInterpretations({
    limit: 5,
    language,
  })();

  const { data: userInfo, refetch: refetchUserInfo } = useUser(language);
  const { data: customerInfo, refetch: refetchCustomerInfo } =
    useGetCustomerInfo();

  const { refetch: refetchUserNotifications } = useFetchUserNotifications({
    userId: userInfo?.userId,
    language,
  })();
  const { pathname } = useRouteInfo();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const isUserSubscriptionActive =
    !userInfo?.isFreeTrialOngoing &&
    !!customerInfo?.activeSubscriptions?.length;

  const onFullSync = () => {
    refetchRecentReports();
    refetchUserInfo();
    refetchUserNotifications();
    refetchCustomerInfo();
  };

  const {
    data,
    isPending: areScanCategoriesLoading,
    isError: areErrorsOnScanCategories,
  } = useScanCategories(language);

  const {
    mutate: onUpdateInterpretationFields,
    isPending: isUpdateTitlePending,
  } = useUpdateInterpretationFields();

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

  //! make sure this functionality is tested properly and also add protection when there is no internet connection
  useCustomScrollToTop(scrollViewRef);
  /** Ask for rating after 5,10 scans */

  useBackHandler(() => (pathname === '/' ? true : false)); // Prevent default behavior and navigating back tot the onboarding

  return (
    <PullToRefresh
      onRefresh={onFullSync}
      // shouldRefresh={false}
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
        <View className="mt-16">
          {/* <View className="mt-2 px-4">
            <Button
              label="Medical Diclaimer"
              className="w-full justify-start bg-primary-100"
              icon={<WarningIcon />}
              textClassName="justify-start text-black ml-4"
              iconPosition="left"
            />
            <Icon
              containerStyle="absolute w-[40px] h-[40px]  items-center justify-center rounded-xl right-4 top-1"
              icon={<EyeIcon />}
              onPress={() => router.navigate('/medical-disclaimer')}
              size={25}
            />
          </View> */}
          {!isUserSubscriptionActive && (
            <FreeTierStatus
              className={`mx-4 rounded-xl bg-white p-4 dark:bg-blackBeauty ${isVerySmallDevice ? 'mx-0' : 'mx-4'}`}
              scansLeft={
                userInfo?.scansRemaining >= 0 ? userInfo?.scansRemaining : 0 //do this to avoid showing values with "-" in front
              }
              onUpgrade={() => router.navigate('/paywall-new')}
            />
          )}
          {!areErrorsOnScanCategories && (
            <>
              <Text className="mx-4 mb-3 mt-2 font-semibold-nunito">
                {translate('home.scanCategories.heading')}
              </Text>

              <ScanCategoriesStories
                categories={data?.categories}
                isLoading={areScanCategoriesLoading}
                className="ml-4"
              />
            </>
          )}
          <Text className="mx-6 mb-4 mt-8 font-semibold-nunito">
            {translate('home.recentReports.heading')}
          </Text>

          <ReportsList
            areRecentReportsLoading={areRecentReportsLoading}
            recentInterpretations={recentInterpretations}
            onUpdateInterpretationFields={onUpdateInterpretationFields}
            isUpdateTitlePending={isUpdateTitlePending}
            className="mx-4"
          />
        </View>
      </ParallaxScrollView>
    </PullToRefresh>
  );
}

const ReportsList = ({
  areRecentReportsLoading,
  recentInterpretations,
  onUpdateInterpretationFields,
  isUpdateTitlePending,
  className,
}: {
  areRecentReportsLoading: boolean;
  recentInterpretations: IInterpretationResultRecords;
  onUpdateInterpretationFields: ({
    documentId,
    fieldsToUpdate,
    language,
  }: {
    documentId: string;
    fieldsToUpdate: object;
    language: string;
  }) => void;
  isUpdateTitlePending: boolean;
  className: string;
}) => {
  const { language } = useSelectedLanguage();
  const { data: userInfo } = useUser(language);
  const [isFirstTime, setIsFirstTime] = useIsFirstTime();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <View className={`flex-1 ${className}`}>
      {areRecentReportsLoading ? (
        <>
          <ReportSkeleton />
          <ReportSkeleton />
          <ReportSkeleton />
        </>
      ) : !recentInterpretations?.records?.length ? (
        <EdgeCaseTemplate
          additionalClassName="mt-8 ml-[-10]"
          image={<NoReports width={100} height={100} />}
          message={translate('home.recentReports.noReports')}
          primaryAction={{
            label: translate('uploadScan.scanNow'),
            icon: <UploadIcon color={isDark ? colors.black : colors.white} />,
            variant: 'default',
            onPress: () => {
              if (
                userInfo?.scansRemaining <= 0 &&
                userInfo.isFreeTrialOngoing
              ) {
                /**
                 * isFirstTime is used to check if the user installs the app for the first time
                 * usually this variable is set to false after first onboarding, but if the first onboarding is not shown again after reinstallation, the thi variable will remain to true
                 * thats why we need to set it to false based on an action instead of creating another useEffect in layout
                 *  */
                isFirstTime && setIsFirstTime(false);

                return Toast.showCustomToast(
                  <CustomAlert
                    title={translate('general.attention')}
                    subtitle={translate('alerts.chatAndMediaFilesLimit')}
                    buttons={[
                      {
                        label: translate('components.UpgradeBanner.heading'),
                        variant: 'default',
                        onPress: () =>
                          wait(500).then(() => router.navigate('/paywall-new')), // a small delay in mandatory for Toast, not sure why
                        buttonTextClassName: 'dark:text-white',
                        className:
                          'flex-1 rounded-xl h-[48] bg-primary-900 active:opacity-80 dark:bg-primary-900',
                      },
                    ]}
                  />,
                  {
                    position: 'middle', // Place the alert in the middle of the screen
                    duration: Infinity, // Keep the alert visible until dismissed
                  },
                );
              }

              router.navigate('/upload-file-flow');
            },
          }}
        />
      ) : (
        <View className="gap-4">
          {recentInterpretations?.records?.map(
            (record: IInterpretationResult) => (
              <CardWrapper
                key={`${record.docId}-${record.title}-${record.createdAt}`}
                chevronColor={colors.primary[900]}
                className="rounded-xl bg-white p-4 dark:bg-blackBeauty"
                onPress={() =>
                  router.navigate({
                    pathname: '/scan-interpretation/[id]',
                    params: { id: record.docId },
                  })
                }
              >
                <ScanReportCard
                  language={language}
                  {...record}
                  isUpdateTitlePending={isUpdateTitlePending}
                  onEditTitle={(title, documentId) =>
                    onUpdateInterpretationFields({
                      documentId,
                      fieldsToUpdate: { title },
                      language,
                    })
                  }
                />
              </CardWrapper>
            ),
          )}
        </View>
      )}
    </View>
  );
};
