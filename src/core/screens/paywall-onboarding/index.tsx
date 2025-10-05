/* eslint-disable max-lines-per-function */
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, SafeAreaView, ScrollView, View } from 'react-native';
import { type CustomerInfo } from 'react-native-purchases';

import { queryClient } from '@/api';
import {
  useGetCustomerInfo,
  useGetOfferings,
  usePurchaseSubscription,
  useRestorePurchases,
} from '@/api/subscription/subscription.hooks';
import { useUpdateUser, useUser } from '@/api/user/user.hooks';
import { type IOnboardingCollectedData } from '@/app/onboarding';
import PricingOption from '@/components/pricing-option';
import { MAX_FREE_SCANS } from '@/constants/limits';
import { SUBSCRIPTION_PLANS_PER_PLATFORM } from '@/constants/subscriptions';
import { DEVICE_TYPE, translate, useIsFirstTime } from '@/core';
import { useCrashlytics } from '@/core/hooks/use-crashlytics';
import { calculateAnnualDiscount } from '@/core/utilities/calculate-annual-discout';
import { type CrashlyticsLogLevel } from '@/crashlytics/crashlytics.types';
import { type IUserInfo } from '@/types/general-types';
import { Button, FocusAwareStatusBar, Text } from '@/ui';

const PaywallOnboarding = ({
  _totalSteps,
  _currentScreenIndex,
  collectedData,
}: {
  totalSteps: number;
  currentScreenIndex: number;
  collectedData;
}) => {
  const [selectedPlan, setSelectedPlan] = useState(
    SUBSCRIPTION_PLANS_PER_PLATFORM?.YEARLY,
  );
  const [, setIsFirstTime] = useIsFirstTime();

  const features = [
    translate(
      'rootLayout.screens.paywallOnboarding.freeTierOfferings.firstOffering',
    ),
    translate(
      'rootLayout.screens.paywallOnboarding.freeTierOfferings.thirdOffering',
    ),
    translate(
      'rootLayout.screens.paywallOnboarding.freeTierOfferings.secondOffering',
    ),
  ];
  const {
    i18n: { language },
  } = useTranslation();
  const { data: userInfo } = useUser(language);
  const { logEvent, recordError } = useCrashlytics();

  const { mutateAsync: onUpdateUser, isPending: isPendingUpdateUser } =
    useUpdateUser();

  const onSuccessRestoration = async (fieldsToUpdate: object) => {
    await onUpdateUser({ language, userId: userInfo.userId, fieldsToUpdate });
  };
  const { mutate: restorePurchase, isPending: isPendingRestorePurchase } =
    useRestorePurchases(onSuccessRestoration);

  const {
    mutateAsync: purchaseSubscription,
    isPending: isLoadingPurchaseSubscription,
  } = usePurchaseSubscription();
  const { data: offerings } = useGetOfferings();
  const { data: customerInfo } = useGetCustomerInfo();
  const formattedOfferings = formatPaywallOnboardingData(offerings);

  const pricePerMonth = formattedOfferings.find(
    (item) => item.id === SUBSCRIPTION_PLANS_PER_PLATFORM?.MONTHLY,
  )?.priceNumber;

  const pricePerYear = formattedOfferings.find(
    (item) => item.id === SUBSCRIPTION_PLANS_PER_PLATFORM?.YEARLY,
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
          customerInfo: customerInfo as CustomerInfo,
          onUpdateUser,
          logEvent,
          setIsFirstTime,
        });

        return;
      }

      const customerInfoUpdated = await purchaseSubscription({
        packageIdentifier: selectedPlan,
      });

      await updateUserAndNavigate({
        userId: userInfo.userId,
        language,
        collectedData,
        customerInfo: customerInfoUpdated as CustomerInfo,
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
    <View className="flex-1 bg-black">
      {/* <FocusAwareStatusBar hidden /> */}
      {/* Liquid Background Image */}
      <ImageBackground
        source={require('../../../ui/assets/images/liquid-purple.jpg')}
        className="absolute inset-0"
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.3, // Adjust opacity as needed (0.5-0.8 works well)
        }}
        resizeMode="cover"
      >
        {/* Dark overlay to enhance readability */}
      </ImageBackground>

      <ScrollView
        contentContainerClassName="pb-12"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView className="flex-1">
          {/* Content */}
          <View
            className={`mt-10 flex-1 px-6 ${DEVICE_TYPE.IOS ? 'mt-10' : 'mt-20'}`}
          >
            {/* Title */}
            <Text className="-mt-2 mb-16 text-center text-4xl font-bold text-white">
              {translate(
                'rootLayout.screens.paywallOnboarding.freeTierOfferings.title',
              )}
            </Text>

            {/* Features */}
            <View className="mb-8">
              {features.map((feature, index) => (
                <View key={index} className="mb-4 w-full flex-row items-center">
                  <View className="mr-4 h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                  <Text className="text-lg font-medium text-white">
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            {/* Pricing Options */}
            <View className="mb-8 gap-3">
              {formattedOfferings.map((plan) => (
                <PricingOption
                  key={plan.id}
                  plan={plan}
                  selectedPlan={selectedPlan}
                  onSelectOption={() => onSelect(plan.id)}
                  badge={
                    discount &&
                    plan.type === 'ANNUAL' &&
                    `${translate('general.saveDiscount')} ${discount}`
                  }
                />
              ))}
            </View>

            {/* Start Free Trial Button */}

            <Button
              label={translate('general.continue')}
              variant="default"
              className="mt-6 h-[55px] w-full rounded-full border-2  bg-[#3B82F6] pl-5 active:bg-primary-700 dark:bg-primary-900"
              textClassName="text-lg text-center text-white dark:text-white"
              iconPosition="left"
              onPress={handleSubscription}
              disabled={
                formattedOfferings?.length === 1 &&
                selectedPlan !== 'free_trial' //disabled only when by mistake only free trial is shown
              }
              loading={isPendingUpdateUser || isLoadingPurchaseSubscription}
            />

            {/* Footer Links */}
            <Button
              label={translate('general.restorePurchase')}
              variant="ghost"
              className="mt-4 self-center active:opacity-70"
              textClassName="text-white"
              onPress={restorePurchase}
              loading={isPendingRestorePurchase}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default PaywallOnboarding;

const formatPaywallOnboardingData = (offerings: any) => {
  const paywallData = [
    {
      id: 'free_trial',
      title: translate(
        'rootLayout.screens.paywallUpgradeScreen.firstOffering.title',
      ),
      subtitle: translate(
        'rootLayout.screens.paywallUpgradeScreen.firstOffering.subtitle',
        { freeScans: MAX_FREE_SCANS },
      ),
      price: 'Free',
      priceNumber: '',
      currency: '',
      type: 'FREE_TRIAL',
    },
  ];
  if (!offerings) return paywallData;

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

export const updateUserAndNavigate = async ({
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
      router.navigate('/(tabs)');
      setIsFirstTime(false);
      logEvent(
        `User ${userId} has been onboarded successfully and selected ${collectedData.selectedPackage} plan and is redirected to home screen`,
      );
    })
    .catch((e) => {
      console.log('error', e);
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

  // Guard clause to ensure onUpdateUser is a function
  // If onUpdateUser is undefined, return a resolved Promise
  if (typeof onUpdateUser !== 'function') {
    console.error('onUpdateUser is not a function');
    return Promise.resolve(); // Resolved Promise to ensure .then() is called
  }

  // Otherwise, call onUpdateUser and return its Promise
  return onUpdateUser({
    language,
    userId,
    fieldsToUpdate,
  });
};
