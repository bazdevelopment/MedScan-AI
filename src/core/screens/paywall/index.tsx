/* eslint-disable max-lines-per-function */
import React from 'react';
import { SafeAreaView, View } from 'react-native';

import Branding from '@/components/branding';
import ProgressDots from '@/components/progress-dots';
import { translate } from '@/core';
import { Button, SelectableLabel, Text } from '@/ui';

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

  const onSelect = (planId: number) => setSelectedPlan(planId);

  return (
    <SafeAreaView className="flex-1  bg-white dark:bg-blackEerie">
      <Branding
        invertedColors
        isLogoVisible
        className="ml-[-15] mt-10 justify-center"
      />

      <View className="flex-1">
        <View className="mt-10  px-6">
          <Text className="mb-2 text-center font-bold-nunito  text-[28px]">
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

        <View className="flex-column mx-6 mb-4 mt-auto items-start justify-between">
          <ProgressDots
            className="bottom-8"
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
    </SafeAreaView>
  );
};

export default Paywall;
