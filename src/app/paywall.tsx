import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import Branding from '@/components/branding';
import Icon from '@/components/icon';
import { SnakeLine, SnakeLineRotated } from '@/components/snake-line';
import { translate } from '@/core';
import getDeviceSizeCategory from '@/core/utilities/get-device-size-category';
import { Button, colors, SelectableLabel } from '@/ui';
import { CloseIcon } from '@/ui/assets/icons';
import {
  CrownIllustration,
  NoAdsIllustration,
  ScanIllustration,
} from '@/ui/assets/illustrations';

const plans = [
  {
    id: 1,
    title: translate(
      'rootLayout.screens.paywallUpgradeScreen.secondOffering.title',
    ),
    subtitle: translate(
      'rootLayout.screens.paywallUpgradeScreen.secondOffering.subtitle',
    ),
  },
  {
    id: 2,
    title: translate(
      'rootLayout.screens.paywallUpgradeScreen.thirdOffering.title',
    ),
    subtitle: translate(
      'rootLayout.screens.paywallUpgradeScreen.thirdOffering.subtitle',
    ),
  },
];

// eslint-disable-next-line max-lines-per-function
const Paywall = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { isVerySmallDevice } = getDeviceSizeCategory();

  const [selectedPlan, setSelectedPlan] = React.useState(2);

  const onSelect = (planId: number) => setSelectedPlan(planId);
  return (
    <ScrollView
      contentContainerStyle={{
        flex: isVerySmallDevice ? 0 : 1,
      }}
    >
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
          {plans.map((plan) => (
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
            onPress={() => console.log('Handle the selected plan')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Paywall;
