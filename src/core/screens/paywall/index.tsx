/* eslint-disable max-lines-per-function */
import { useColorScheme } from 'nativewind';
import React from 'react';
import { ScrollView, View } from 'react-native';

import Branding from '@/components/branding';
import ProgressDots from '@/components/progress-dots';
import { SnakeLine, SnakeLineRotated } from '@/components/snake-line';
import { DEVICE_TYPE, translate } from '@/core';
import {
  Button,
  colors,
  FocusAwareStatusBar,
  SelectableLabel,
  Text,
} from '@/ui';

const plans = [
  {
    id: 1,
    title: 'Start Free Trial',
    subtitle: 'Enjoy 10 free scans - no commitments',
  },
  {
    id: 2,
    title: 'Monthly Plan',
    subtitle: '$49.99 / month',
  },
  {
    id: 3,
    title: 'Yearly Plan',
    subtitle: 'Best deal: $99.99/year – save more!',
  },
];

const Paywall = ({
  onFinish,
  totalSteps,
  currentScreenIndex,
}: {
  onFinish: () => void;
  totalSteps: number;
  currentScreenIndex: number;
}) => {
  const [selectedPlan, setSelectedPlan] = React.useState(2);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const onSelect = (planId: number) => setSelectedPlan(planId);

  return (
    <ScrollView
      contentContainerClassName={`pt-10 ${DEVICE_TYPE.IOS && 'flex-1'}`}
    >
      <FocusAwareStatusBar hidden />
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute right-[150] top-[10]"
      />
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute right-[50] top-0"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute left-[100] top-[-20]"
      />

      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute right-[-10] top-[-30]"
      />
      <Branding
        invertedColors
        isLogoVisible
        className="ml-[-15] mt-10 justify-center"
      />

      <View className="flex-1">
        <View className="mt-10  px-6">
          <Text className="text-center mb-2 font-bold-nunito  text-[28px]">
            Unlock Premium Features Today! 🎉
          </Text>
        </View>

        <View className="mt-8 px-6">
          {plans.map((plan) => (
            <SelectableLabel
              key={plan.id}
              title={plan.title}
              subtitle={plan.subtitle}
              selected={selectedPlan === plan.id}
              onPress={() => onSelect(plan.id)}
              additionalClassName={`${selectedPlan === plan.id ? 'px-6 border-primary-900 bg-primary-100 dark:bg-primary-900 dark:border-primary-500' : 'px-6 bg-white border border-gray-300'}`}
              titleClassName={`${selectedPlan === plan.id ? 'text-black text-lg font-bold-nunito' : 'text-gray-900'}`}
              subtitleClassName={`${selectedPlan === plan.id ? 'text-gray-800 font-regular-nunito' : 'text-gray-900'}`}
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
            onPress={() => onFinish({ selectedPackage: selectedPlan })}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Paywall;
