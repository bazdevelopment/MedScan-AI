import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { type CustomerInfo } from 'react-native-purchases';
import { Toaster } from 'sonner-native';

import {
  useGetOfferings,
  usePurchaseSubscription,
  useRestorePurchases,
} from '@/api/subscription/subscription.hooks';
import { useUpdateUser, useUser } from '@/api/user/user.hooks';
import Branding from '@/components/branding';
import { SnakeLine, SnakeLineRotated } from '@/components/snake-line';
import { SUBSCRIPTION_PLANS_PER_PLATFORM } from '@/constants/subscriptions';
import { DEVICE_TYPE, translate } from '@/core';
import { updateUserAfterSelectingPlan } from '@/core/screens/paywall-onboarding';
import { calculateAnnualDiscount } from '@/core/utilities/calculate-annual-discout';
import getDeviceSizeCategory from '@/core/utilities/get-device-size-category';
import { Button, colors, SelectableLabel } from '@/ui';
import { CloseIcon } from '@/ui/assets/icons';
import {
  CrownIllustration,
  NoAdsIllustration,
  ScanIllustration,
} from '@/ui/assets/illustrations';

const formatPaywallData = (offerings: any) => {
  if (!offerings) return [];

  const paywallData = [];

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

  return paywallData;
};

// eslint-disable-next-line max-lines-per-function
const Paywall = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { isVerySmallDevice } = getDeviceSizeCategory();

  const {
    i18n: { language },
  } = useTranslation();
  const { data: userInfo } = useUser(language);

  const { mutateAsync: onUpdateUser, isPending: isPendingUpdateUser } =
    useUpdateUser();

  const [selectedPlan, setSelectedPlan] = useState(
    SUBSCRIPTION_PLANS_PER_PLATFORM?.YEARLY,
  );

  const onSuccessRestoration = async (fieldsToUpdate: object) => {
    await onUpdateUser({ language, userId: userInfo.userId, fieldsToUpdate });
  };

  const { mutateAsync: purchaseSubscription } = usePurchaseSubscription();
  const { data: offerings } = useGetOfferings();
  const formattedOfferings = formatPaywallData(offerings);
  const { mutate: restorePurchase, isPending: isPendingRestorePurchase } =
    useRestorePurchases(onSuccessRestoration);

  const pricePerMonth = formattedOfferings.find(
    (item) => item.id === SUBSCRIPTION_PLANS_PER_PLATFORM?.MONTHLY,
  )?.priceNumber;

  const pricePerYear = formattedOfferings.find(
    (item) => item.id === SUBSCRIPTION_PLANS_PER_PLATFORM?.YEARLY,
  )?.priceNumber;

  const discount = calculateAnnualDiscount(pricePerMonth, pricePerYear);
  const onSelect = (planId: string) => setSelectedPlan(planId);

  const handlePurchase = async () => {
    const customerInfoAfterPurchase = await purchaseSubscription({
      packageIdentifier: selectedPlan,
    });

    await updateUserAfterSelectingPlan({
      language,
      userId: userInfo.userId,
      collectedData: { preferredName: userInfo.userName },
      customerInfo: customerInfoAfterPurchase as CustomerInfo,
      onUpdateUser,
    });

    if (customerInfoAfterPurchase) {
      router.back();
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          overflow: 'hidden',
          paddingBottom: 200,
        }}
      >
        {DEVICE_TYPE.IOS && (
          <Toaster autoWiggleOnUpdate="toast-change" pauseWhenPageIsHidden />
        )}
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
          {DEVICE_TYPE.IOS && (
            <LottieView
              source={require('assets/lottie/confetti-animation.json')}
              autoPlay
              loop={false}
              renderMode="HARDWARE"
              style={{ flex: 1 }}
            />
          )}
        </View>

        <View className="flex-1 bg-primary-50 dark:bg-blackEerie">
          <View
            className={`rounded-b-[50px] bg-primary-900  dark:bg-blackBeauty ${DEVICE_TYPE.IOS ? 'pt-6' : 'pt-10'}`}
          >
            <Button
              icon={
                <CloseIcon
                  width={30}
                  height={30}
                  fill={colors.white}
                  right={18}
                />
              }
              onPress={router.back}
              className="left-6 top-[-10] h-[30] w-[30] justify-center bg-transparent dark:bg-transparent"
            />

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
            <Branding isLogoVisible className="mt-[-20] justify-center" />

            <View className="gap-4 px-8 pb-4 pt-8">
              <Text className="mb-2 text-center font-bold-nunito text-[24px] text-white">
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

          <View className="mt-2 px-6">
            {formattedOfferings.map((plan) => (
              <SelectableLabel
                key={plan.id}
                title={plan.title}
                subtitle={plan.subtitle}
                selected={selectedPlan === plan.id}
                onPress={() => onSelect(plan.id)}
                additionalClassName={`${selectedPlan === plan.id ? 'px-6 border-primary-900 bg-primary-300 dark:bg-primary-900 dark:border-primary-500' : 'px-6 bg-white border border-gray-300'}`}
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
        </View>
      </ScrollView>
      <View className="flex-column absolute bottom-0 mx-6 w-full items-start justify-between self-center overflow-hidden px-6 pb-4 dark:bg-blackEerie">
        <Button
          label={translate('general.continue')}
          variant="default"
          disabled={!selectedPlan || !formattedOfferings?.length}
          className="mt-6 h-[55px] w-full rounded-xl border-2 border-primary-900 bg-primary-900 pl-5 active:bg-primary-700 dark:bg-primary-900"
          textClassName="text-lg text-center text-white dark:text-white"
          iconPosition="left"
          onPress={handlePurchase}
          loading={isPendingUpdateUser}
        />
        <Button
          label={translate('general.restorePurchase')}
          variant="ghost"
          className="self-center active:opacity-70"
          onPress={restorePurchase}
          loading={isPendingRestorePurchase}
        />
      </View>
    </>
  );
};

export default Paywall;
