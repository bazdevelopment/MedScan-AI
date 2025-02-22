/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { type CustomerInfo } from 'react-native-purchases';

import { queryClient } from '@/api';
import { useUpdateUser, useUser } from '@/api/user/user.hooks';
import { type IOnboardingCollectedData } from '@/app/onboarding';
import Branding from '@/components/branding';
import ProgressDots from '@/components/progress-dots';
import { SnakeLine, SnakeLineRotated } from '@/components/snake-line';
import { DEVICE_TYPE, translate, useIsFirstTime } from '@/core';
import { useCrashlytics } from '@/core/hooks/use-crashlytics';
import { useRevenueCat } from '@/core/hooks/use-revenue-cat';
import { calculateAnnualDiscount } from '@/core/utilities/calculate-annual-discout';
import getDeviceSizeCategory from '@/core/utilities/get-device-size-category';
import { type CrashlyticsLogLevel } from '@/crashlytics/crashlytics.types';
import { type IUserInfo } from '@/types/general-types';
import {
  Button,
  colors,
  FocusAwareStatusBar,
  SelectableLabel,
  Text,
} from '@/ui';
import {
  CrownIllustration,
  NoAdsIllustration,
  ScanIllustration,
} from '@/ui/assets/illustrations';

const PaywallOnboarding = ({
  totalSteps,
  currentScreenIndex,
  collectedData,
}: {
  totalSteps: number;
  currentScreenIndex: number;
  collectedData;
}) => {
  const [selectedPlan, setSelectedPlan] = React.useState(
    'med_scan_ai_1month_subscription:monthly-subsription',
  );
  const [, setIsFirstTime] = useIsFirstTime();
  const { colorScheme } = useColorScheme();
  const { isVerySmallDevice } = getDeviceSizeCategory();

  const isDark = colorScheme === 'dark';
  const {
    i18n: { language },
  } = useTranslation();
  const { data: userInfo } = useUser(language);
  const { logEvent, recordError } = useCrashlytics();

  const { mutateAsync: onUpdateUser, isPending: isPendingUpdateUser } =
    useUpdateUser();

  const { offerings, purchaseSubscription, customerInfo } = useRevenueCat();
  const formattedOfferings = formatPaywallOnboardingData(offerings);

  const pricePerMonth = formattedOfferings.find(
    (item) => item.id === 'med_scan_ai_1month_subscription:monthly-subsription',
  )?.priceNumber;

  const pricePerYear = formattedOfferings.find(
    (item) => item.id === 'med_scan_ai_1year_subscription:yearly-subscription',
  )?.priceNumber;

  const discount = calculateAnnualDiscount(pricePerMonth, pricePerYear);

  const onSelect = (planId: string) => setSelectedPlan(planId);

  const handleSubscription = async () => {
    try {
      if (selectedPlan === 'free_trial') {
        await updateUserAndNavigate({
          userId: userInfo.userId,
          language,
          collectedData,
          customerInfo,
          onUpdateUser,
          logEvent,
          setIsFirstTime,
        });

        return;
      }

      const customerInfoUpdated: CustomerInfo =
        await purchaseSubscription(selectedPlan);

      await updateUserAndNavigate({
        userId: userInfo.userId,
        language,
        collectedData,
        customerInfo: customerInfoUpdated,
        onUpdateUser,
        logEvent,
        setIsFirstTime,
      });
    } catch (error) {
      recordError(
        error,
        'Failure on completing onboarding (but it can be false - known issue)',
      );
    }
  };

  return (
    <ScrollView contentContainerClassName={`${DEVICE_TYPE.IOS && 'flex-1'}`}>
      <FocusAwareStatusBar hidden />
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          pointerEvents: 'none',
        }}
      >
        <LottieView
          source={require('assets/lottie/confetti-animation.json')}
          autoPlay
          loop={false}
          renderMode="SOFTWARE"
          style={{ flex: 1 }}
        />
      </View>

      <View className="rounded-b-[50px]  bg-primary-900 pb-6 pt-20 dark:bg-blackBeauty">
        <SnakeLine
          color={isDark ? colors.charcoal[600] : colors.primary[600]}
          className={`absolute right-[100] top-[-20] ${isVerySmallDevice ? 'right-[10] top-[20]' : 'right[-100]'}`}
        />

        <SnakeLineRotated
          color={isDark ? colors.charcoal[600] : colors.primary[600]}
          className="absolute left-[80] top-[5]"
        />

        <SnakeLineRotated
          color={isDark ? colors.charcoal[600] : colors.primary[600]}
          className="absolute right-[-10] top-[-40]"
        />
        <Branding isLogoVisible className="justify-center" />

        <View className="gap-4 px-8 pt-8">
          <Text className="mb-4 text-center font-bold-nunito  text-[24px] text-white">
            {translate(
              'rootLayout.screens.paywallOnboarding.freeTierOfferings.title',
            )}
          </Text>

          <View className="max-w-[90%] flex-row items-center gap-4">
            <CrownIllustration width={35} height={35} />
            <Text className="font-bold-nunito text-lg text-white">
              {translate(
                'rootLayout.screens.paywallOnboarding.freeTierOfferings.firstOffering',
              )}
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <ScanIllustration
              width={35}
              height={35}
              fill={isDark ? colors.white : colors.blackBeauty}
            />
            <Text className="font-bold-nunito text-lg text-white">
              {translate(
                'rootLayout.screens.paywallOnboarding.freeTierOfferings.thirdOffering',
              )}
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <NoAdsIllustration width={35} height={35} />
            <Text className="font-bold-nunito text-lg text-white">
              {translate(
                'rootLayout.screens.paywallOnboarding.freeTierOfferings.secondOffering',
              )}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-1">
        <View className="mt-8 px-6">
          {formattedOfferings.map((plan) => (
            <SelectableLabel
              key={plan.id}
              title={plan.title}
              subtitle={plan.subtitle}
              selected={selectedPlan === plan.id}
              onPress={() => onSelect(plan.id)}
              additionalClassName={`${selectedPlan === plan.id ? 'px-6 border-primary-900 bg-primary-100 dark:bg-primary-900 dark:border-primary-500' : 'px-6 bg-white border border-gray-300'}`}
              titleClassName={`${selectedPlan === plan.id ? 'text-black text-lg font-bold-nunito' : 'text-gray-900'}`}
              subtitleClassName={`${selectedPlan === plan.id ? 'text-gray-800 font-bold-nunito' : 'text-gray-900'}`}
              indicatorPosition="left"
              indicatorType="checkbox"
              extraInfo={
                discount &&
                plan.type === 'ANNUAL' &&
                `${translate('general.saveDiscount')} ${discount}`
              }
            />
          ))}
        </View>

        <View className="flex-column mx-6 mb-4  items-start justify-between">
          <ProgressDots
            className="mb-10 mt-20"
            totalSteps={totalSteps}
            currentStep={currentScreenIndex}
          />
          <Button
            label={translate('general.continue')}
            variant="default"
            className="mt-6 h-[55px] w-full rounded-xl border-2 border-primary-900 bg-primary-900 pl-5 active:bg-primary-700 dark:bg-primary-900"
            textClassName="text-lg text-center text-white dark:text-white"
            iconPosition="left"
            onPress={handleSubscription}
            loading={isPendingUpdateUser}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PaywallOnboarding;

const formatPaywallOnboardingData = (offerings: any) => {
  if (!offerings) return [];

  const paywallData = [
    {
      id: 'free_trial',
      title: translate(
        'rootLayout.screens.paywallUpgradeScreen.firstOffering.title',
      ),
      subtitle: translate(
        'rootLayout.screens.paywallUpgradeScreen.firstOffering.subtitle',
      ),
      price: 'Free',
      priceNumber: '',
      currency: '',
      type: 'FREE_RIAL',
    },
  ];

  if (offerings?.monthly?.product) {
    paywallData.push({
      id: offerings.monthly.product.identifier,
      title: translate(
        'rootLayout.screens.paywallUpgradeScreen.secondOffering.title',
      ),
      subtitle: translate(
        'rootLayout.screens.paywallUpgradeScreen.secondOffering.subtitle',
        {
          price: offerings.monthly.product.priceString,
        },
      ),
      price: offerings.monthly.product.priceString,
      priceNumber: offerings.monthly.product.price,
      currency: offerings.monthly.product.currencyCode,
      type: 'MONTHLY',
    });
  }

  // Ensure offerings exist before accessing properties
  if (offerings?.annual?.product) {
    paywallData.push({
      id: offerings.annual.product.identifier,
      title: translate(
        'rootLayout.screens.paywallUpgradeScreen.thirdOffering.title',
      ),
      subtitle: translate(
        'rootLayout.screens.paywallUpgradeScreen.thirdOffering.subtitle',
        { price: offerings.annual.product.priceString },
      ),
      price: offerings.annual.product.priceString,
      priceNumber: offerings.annual.product.price,
      currency: offerings.annual.product.currencyCode,
      type: 'ANNUAL',
    });
  }

  return paywallData;
};

const updateUserAndNavigate = async ({
  userId,
  language,
  collectedData,
  customerInfo,
  onUpdateUser,
  logEvent,
  setIsFirstTime,
}: {
  userId: string;
  language: string;
  collectedData: IOnboardingCollectedData;
  customerInfo: CustomerInfo;
  setIsFirstTime: (value: boolean) => void;
  logEvent: (message: string, level?: CrashlyticsLogLevel) => Promise<void>;
  onUpdateUser: ({
    language,
    userId,
    fieldsToUpdate,
  }: {
    language: string;
    userId: string;
    fieldsToUpdate: object;
  }) => Promise<void>;
}) => {
  await updateUserAfterSelectingPlan({
    language,
    userId,
    collectedData,
    customerInfo,
    onUpdateUser,
  })
    .then(() => {
      queryClient.setQueryData(['user-info'], (oldData: IUserInfo) => ({
        ...oldData,
        isOnboarded: true,
      }));

      setIsFirstTime(false);
      router.navigate('/(tabs)');
      logEvent(
        `User ${userId} has been onboarded successfully and selected ${collectedData.selectedPackage} plan and is redirected to home screen`,
      );
    })
    .catch(() => {
      // !updateUserAfterSelectingPlan will throw an error if the google modal for subscription is shown and the user close the modal (without paying)
    });
};

export const updateUserAfterSelectingPlan = async ({
  language,
  userId,
  collectedData,
  customerInfo,
  onUpdateUser,
}: {
  language: string;
  userId: string;
  collectedData: { preferredName: string };
  customerInfo: CustomerInfo;
  onUpdateUser: ({
    language,
    userId,
    fieldsToUpdate,
  }: {
    language: string;
    userId: string;
    fieldsToUpdate: object;
  }) => Promise<void>;
}) => {
  const fieldsToUpdate: Partial<IUserInfo> = {
    isOnboarded: true,
    ...(collectedData.preferredName && {
      userName: collectedData.preferredName,
    }),
    isFreeTrialOngoing: !!customerInfo?.activeSubscriptions?.length
      ? false
      : true,
    ...(customerInfo && {
      activeSubscriptionsRevenue: customerInfo.activeSubscriptions,
      allExpirationDatesRevenue: customerInfo.allExpirationDates,
      allPurchaseDatesRevenue: customerInfo.allPurchaseDates,
      allPurchasedProductIdentifiersRevenue:
        customerInfo.allPurchasedProductIdentifiers,
      firstSeenRevenue: customerInfo.firstSeen,
    }),
  };

  if (customerInfo) {
    await onUpdateUser({
      language,
      userId,
      fieldsToUpdate,
    });
  } else {
    throw new Error('Error');
  }
};
