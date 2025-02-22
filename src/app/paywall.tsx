import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { type CustomerInfo } from 'react-native-purchases';

import { useUpdateUser, useUser } from '@/api/user/user.hooks';
import Branding from '@/components/branding';
import Icon from '@/components/icon';
import { SnakeLine, SnakeLineRotated } from '@/components/snake-line';
import { translate } from '@/core';
import { useRevenueCat } from '@/core/hooks/use-revenue-cat';
import { updateUserAfterSelectingPlan } from '@/core/screens/paywall-onboarding';
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

  const [selectedPlan, setSelectedPlan] = React.useState(
    'med_scan_ai_1month_subscription:monthly-subsription',
  );

  const { offerings, purchaseSubscription } = useRevenueCat();
  const formattedOfferings = formatPaywallData(offerings);

  const onSelect = (planId: string) => setSelectedPlan(planId);

  const handlePurchase = async () => {
    const customerInfoAfterPurchase: CustomerInfo =
      await purchaseSubscription(selectedPlan);

    await updateUserAfterSelectingPlan({
      language,
      userId: userInfo.userId,
      collectedData: { preferredName: userInfo.userName },
      customerInfo: customerInfoAfterPurchase,
      onUpdateUser,
    });

    customerInfoAfterPurchase && router.back();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: isVerySmallDevice ? 0 : 1,
      }}
    >
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

      <View className="flex-1 bg-primary-50 dark:bg-blackEerie">
        <View className="rounded-b-[50px]  bg-primary-900 pb-6 pt-12 dark:bg-blackBeauty">
          <Icon
            icon={<CloseIcon />}
            color={colors.white}
            size={25}
            containerStyle="absolute left-6 z-2 rounded-full  top-6 mr-6"
            onPress={router.back}
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

        <View className="mt-4 px-6">
          {formattedOfferings.map((plan) => (
            <SelectableLabel
              key={plan.id}
              title={plan.title}
              subtitle={plan.subtitle}
              selected={selectedPlan === plan.id}
              onPress={() => onSelect(plan.id)}
              additionalClassName={`${selectedPlan === plan.id ? 'px-6 border-primary-900 bg-primary-300 dark:bg-primary-900 dark:border-primary-500' : 'px-6 bg-white border border-gray-300'}`}
              titleClassName={`${selectedPlan === plan.id ? 'text-black text-lg font-bold-nunito' : 'text-gray-900'}`}
              subtitleClassName={`${selectedPlan === plan.id ? 'text-gray-800 font-regular-nunito' : 'text-gray-900'}`}
            />
          ))}
        </View>
        <View className="flex-column mx-6 mb-16 mt-auto items-start justify-between">
          <Button
            label={translate('general.continue')}
            variant="default"
            className="mt-6 h-[55px] w-full rounded-xl border-2 border-primary-900 bg-primary-900 pl-5 active:bg-primary-700 dark:bg-primary-900"
            textClassName="text-lg text-center text-white dark:text-white"
            iconPosition="left"
            onPress={handlePurchase}
            loading={isPendingUpdateUser}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Paywall;
