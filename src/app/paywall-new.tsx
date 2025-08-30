/* eslint-disable max-lines-per-function */
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { type CustomerInfo } from 'react-native-purchases';

import {
  useGetCustomerInfo,
  useGetOfferings,
  usePurchaseSubscription,
  useRestorePurchases,
} from '@/api/subscription/subscription.hooks';
import { useUpdateUser, useUser } from '@/api/user/user.hooks';
import Icon from '@/components/icon';
import { SUBSCRIPTION_PLANS_PER_PLATFORM } from '@/constants/subscriptions';
import { DEVICE_TYPE, translate, useIsFirstTime } from '@/core';
import { useCrashlytics } from '@/core/hooks/use-crashlytics';
import { updateUserAndNavigate } from '@/core/screens/paywall-onboarding';
import { requestAppRatingWithDelay } from '@/core/utilities/request-app-review';
import { Button, CheckboxIcon, colors, Image, Switch, Text } from '@/ui';
import { CloseIcon } from '@/ui/assets/icons';

const formatPaywallData = (offerings: any) => {
  if (!offerings) return [];

  const paywallData = [];

  if (offerings?.annual?.product) {
    paywallData.push({
      id: offerings.annual.product.identifier,
      title: translate(
        'rootLayout.screens.paywallUpgradeScreen.thirdOffering.title',
      ),
      subtitle: translate(
        'rootLayout.screens.paywallUpgradeScreen.thirdOffering.subtitle',
        {
          price: offerings.annual.product.priceString,
        },
      ),
      price: offerings.annual.product.priceString,
      priceNumber: offerings.annual.product.price,
      currency: offerings.annual.product.currencyCode,
      type: 'ANNUAL',
    });
  }

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

  if (offerings?.weekly?.product) {
    paywallData.push({
      id: offerings.weekly.product.identifier,
      title: translate(
        'rootLayout.screens.paywallUpgradeScreen.fourthOffering.title',
        { trialDays: 3 },
      ),
      subtitle: translate(
        'rootLayout.screens.paywallUpgradeScreen.fourthOffering.subtitle',
        {
          price: offerings.weekly.product.priceString,
        },
      ),
      price: offerings.weekly.product.priceString,
      priceNumber: offerings.weekly.product.price,
      currency: offerings.weekly.product.currencyCode,
      type: 'WEEKLY',
    });
  }

  return paywallData;
};

const FeatureRow = ({ icon, text }: { icon: string; text: string }) => (
  <View className="mb-3 flex-row items-center">
    <View className="mr-4 items-center justify-center rounded-full bg-blue-500 p-1">
      <Ionicons name={icon as any} size={14} color="white" />
    </View>
    <Text className="flex-1 font-semibold-nunito text-lg">{text}</Text>
  </View>
);

const PricingCard = ({
  title,
  subtitle,
  price,
  originalPrice,
  badge,
  isSelected,
  onPress,
  isFree = false,
}: {
  title: string;
  subtitle?: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  isSelected: boolean;
  onPress: () => void;
  isFree?: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`rounded-xl border-2 px-4 py-3.5 ${
      isSelected
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
        : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-black'
    }`}
    activeOpacity={0.7}
  >
    <View className="flex-row items-center justify-between">
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text className="font-bold-nunito text-lg text-gray-900">
            {title}
          </Text>
          {badge && (
            <View className="ml-3 rounded-lg bg-red-500 px-3 py-1">
              <Text className="font-bold-nunito text-[13px] text-white">
                {badge}
              </Text>
            </View>
          )}
        </View>

        <View>
          {originalPrice && (
            <View className="mt-1 flex-row">
              <Text className="mr-2 font-semibold-nunito text-base text-gray-400 line-through">
                {originalPrice}
              </Text>
              <Text className="font-semibold-nunito text-base text-gray-900">
                {price} {translate('general.perYear')}
              </Text>
              {/* {isFree && (
                <View className="ml-3 rounded bg-green-500 px-2 py-1">
                  <Text className="text-xs font-bold text-white">FREE</Text>
                </View>
              )} */}
            </View>
          )}
          {isFree && (
            <View className="absolute -top-6 right-3 self-end rounded px-2 py-1">
              <Text className="font-extra-bold-nunito text-xl text-black">
                {translate('general.free')}
              </Text>
            </View>
          )}
        </View>

        {subtitle && (
          <Text className="text-md font-primary-nunito text-charcoal-900">
            {subtitle}
          </Text>
        )}
      </View>

      <View
        className={`h-6 w-6 rounded-full border-2 ${
          isSelected
            ? 'border-blue-500 bg-blue-500'
            : 'border-gray-300 bg-white dark:bg-black'
        } items-center justify-center`}
      >
        {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
    </View>
  </TouchableOpacity>
);

const PaywallNew = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const { allowAppAccess = 'false' } = useLocalSearchParams();

  const { data: userInfo } = useUser(language);
  const YEAR_PLAN_DISCOUNT = 90;
  const { data: customerInfo } = useGetCustomerInfo();
  const [, setIsFirstTime] = useIsFirstTime();

  const { mutateAsync: onUpdateUser, isPending: isPendingUpdateUser } =
    useUpdateUser();
  const { logEvent } = useCrashlytics();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Initialize with yearly plan selected and free trial off
  const [selectedPlan, setSelectedPlan] = useState('weekly');
  const [freeTrialEnabled, setFreeTrialEnabled] = useState(
    selectedPlan === 'weekly',
  );

  // Handle switch toggle
  const handleSwitchToggle = (value: boolean) => {
    setFreeTrialEnabled(value);
    // Switch selected plan based on toggle
    setSelectedPlan(value ? 'weekly' : 'yearly');
  };

  // Manual plan selection (when user taps on cards)
  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    // Update switch to match selected plan
    setFreeTrialEnabled(plan === 'weekly');
  };

  const onSuccessRestoration = async (fieldsToUpdate: object) => {
    await onUpdateUser({ language, userId: userInfo.userId, fieldsToUpdate });
  };

  const { mutateAsync: purchaseSubscription } = usePurchaseSubscription();
  const { data: offerings } = useGetOfferings();
  const formattedOfferings = formatPaywallData(offerings);
  const annualOffering = formattedOfferings?.find(
    (offering) => offering.type === 'ANNUAL',
  );
  const monthlyOffering = formattedOfferings?.find(
    (offering) => offering.type === 'MONTHLY',
  );

  const weeklyOffering = formattedOfferings?.find(
    (offering) => offering.type === 'WEEKLY',
  );

  const { mutate: restorePurchase, isPending: isPendingRestorePurchase } =
    useRestorePurchases(onSuccessRestoration);

  const features = [
    {
      title: translate(
        'rootLayout.screens.paywallOnboarding.freeTierOfferings.firstOffering',
      ),
      icon: <CheckboxIcon />,
    },
    {
      title: translate(
        'rootLayout.screens.paywallOnboarding.freeTierOfferings.thirdOffering',
      ),
      icon: <CheckboxIcon />,
    },
    {
      title: translate(
        'rootLayout.screens.paywallOnboarding.freeTierOfferings.fourthOffering',
      ),
      icon: <CheckboxIcon />,
    },
    {
      title: translate(
        'rootLayout.screens.paywallOnboarding.freeTierOfferings.secondOffering',
      ),
      icon: <CheckboxIcon />,
    },
  ];
  const handlePurchase = async () => {
    const packageIdentifier =
      selectedPlan === 'yearly'
        ? SUBSCRIPTION_PLANS_PER_PLATFORM?.YEARLY
        : selectedPlan === 'monthly'
          ? SUBSCRIPTION_PLANS_PER_PLATFORM?.MONTHLY
          : SUBSCRIPTION_PLANS_PER_PLATFORM?.WEEKLY;

    const customerInfoAfterPurchase = await purchaseSubscription({
      packageIdentifier,
    });

    if (customerInfoAfterPurchase) {
      updateUserAndNavigate({
        userId: userInfo.userId,
        language,
        collectedData: {},
        customerInfo: customerInfo as CustomerInfo,
        onUpdateUser,
        logEvent,
        setIsFirstTime,
      });
      requestAppRatingWithDelay(3000);
      DEVICE_TYPE.IOS && router.dismiss();
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}

          <Icon
            size={28}
            containerStyle="right-4 top-3 self-end p-2 z-10"
            onPress={() => {
              if (allowAppAccess === 'true') {
                updateUserAndNavigate({
                  userId: userInfo.userId,
                  language,
                  collectedData: {},
                  customerInfo: customerInfo as CustomerInfo,
                  onUpdateUser,
                  logEvent,
                  setIsFirstTime,
                });
                requestAppRatingWithDelay(3000);
                DEVICE_TYPE.IOS && router.dismiss();
                return;
              }

              router.back();
            }}
            icon={
              <CloseIcon
                strokeWidth={1.85}
                color={isDark ? colors.charcoal[600] : colors.charcoal[300]}
              />
            }
          />

          {/* Content Container */}
          <View className="-mt-4 px-6">
            {/* Fish Icon */}
            <View className="mb-12 items-center">
              {/* <FishIcon /> */}
              <Image
                source={require('../ui/assets/images/chest-xray.png')}
                style={{
                  width: 150,
                  height: 100,
                }}
              />
            </View>

            {/* Title */}
            <Text className="mb-6 text-center font-extra-bold-nunito text-3xl text-gray-900">
              {translate(
                'rootLayout.screens.paywallOnboarding.freeTierOfferings.heading',
              )}
            </Text>

            {/* Features */}
            <View className="mb-8 w-[90%] items-center justify-center self-center">
              {features.map((feature, idx) => (
                <FeatureRow key={idx} icon="checkmark" text={feature.title} />
              ))}
            </View>

            {/* Pricing Options */}
            <View className="gap-3">
              {annualOffering && (
                <PricingCard
                  title={annualOffering.title}
                  price={annualOffering.price}
                  originalPrice={`${calculateOriginalPrice(annualOffering.priceNumber, YEAR_PLAN_DISCOUNT)} ${annualOffering.currency}`}
                  badge={`${translate('general.saveDiscount')} ${YEAR_PLAN_DISCOUNT}%`}
                  isSelected={selectedPlan === 'yearly'}
                  onPress={() => handlePlanSelection('yearly')}
                />
              )}
              {monthlyOffering && (
                <PricingCard
                  title={monthlyOffering.title}
                  subtitle={`${monthlyOffering.price} ${translate('general.perMonth')}`}
                  price=""
                  isSelected={selectedPlan === 'monthly'}
                  onPress={() => handlePlanSelection('monthly')}
                  isFree={false}
                />
              )}
              {weeklyOffering && (
                <PricingCard
                  title={weeklyOffering.title}
                  subtitle={`${translate('general.then')} ${weeklyOffering.price} ${translate('general.perWeek')}`}
                  price=""
                  isSelected={selectedPlan === 'weekly'}
                  onPress={() => handlePlanSelection('weekly')}
                  isFree={true}
                />
              )}
            </View>

            {/* Free Trial Toggle */}
            <View className="mb-10 mt-3 flex-row items-center justify-between rounded-2xl bg-gray-100 p-4 dark:bg-charcoal-800">
              <Text className="font-bold-nunito text-lg text-gray-900">
                {translate(
                  'rootLayout.screens.paywallOnboarding.freeTierOfferings.freeTrialEnabled',
                )}
              </Text>
              <Switch
                checked={freeTrialEnabled}
                onChange={handleSwitchToggle}
                accessibilityLabel="switch-paywall"
              />
            </View>

            {/* Try for Free Button */}
            <TouchableOpacity
              onPress={handlePurchase}
              className="mb-2 h-14 items-center justify-center rounded-xl bg-blue-500 shadow-lg"
              activeOpacity={0.8}
              disabled={isPendingUpdateUser}
            >
              <View className="flex-row items-center">
                <Text className="mr-2 font-bold-nunito text-xl text-white">
                  {freeTrialEnabled
                    ? translate('general.tryForFree')
                    : translate('general.unlockNow')}
                </Text>
                <Ionicons name="chevron-forward" size={24} color="white" />
              </View>
            </TouchableOpacity>

            {/* Footer Links */}
            <View className="items-center">
              <View className="flex-row flex-wrap items-center justify-center">
                <Button
                  label={translate('general.restorePurchase')}
                  variant="ghost"
                  className="self-center active:opacity-70"
                  textClassName="text-black dark:text-white font-semibold-nunito"
                  onPress={restorePurchase}
                  loading={isPendingRestorePurchase}
                />

                {/* <Text className="mx-4 text-base text-gray-400">•</Text>

                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-base font-medium-nunito text-gray-600 underline">
                    Terms of Use
                  </Text>
                </TouchableOpacity>
                <Text className="mx-4 text-base text-gray-400">•</Text>

                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-base font-medium-nunito text-gray-600 underline">
                    Privacy Policy
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PaywallNew;

function calculateOriginalPrice(
  reducedPrice: number,
  discountPercentage: number,
) {
  // Convert discount percentage to a decimal (e.g., 90% = 0.9, 60% = 0.6)
  const remainingPercentage = 1 - discountPercentage / 100;

  // Calculate the original price
  return (reducedPrice / remainingPercentage).toFixed(2);
}
