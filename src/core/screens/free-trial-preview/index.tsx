/* eslint-disable max-lines-per-function */
import { useColorScheme } from 'nativewind';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

import ProgressDots from '@/components/progress-dots';
import { SnakeLine, SnakeLineRotated } from '@/components/snake-line';
import { Button, colors, Text } from '@/ui';
import {
  CrownIllustration,
  NoAdsIllustration,
  ScanIllustration,
} from '@/ui/assets/illustrations';

const FreeTrialPreview = ({
  totalSteps,
  currentScreenIndex,
  goToNextScreen,
  onSkip,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <SafeAreaView className="flex-1 bg-primary-900 dark:bg-blackEerie">
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute right-[150] top-[20]"
      />
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute right-[50] top-[10]"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute left-[100] top-[-20]"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute left-[170] top-[-120]"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute left-[200] top-[-20]"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute right-[-10] top-[-20]"
      />
      <View className="flex-1 px-6 pt-8">
        <Text className="font-bold-nunito text-[32px]  text-white">
          Enjoy your free trial! 🎉
        </Text>

        <Text className="mb-1 mt-2 text-lg text-white">
          Experience these amazing benefits during your free trial.
        </Text>

        <PremiumFeatures />

        {/* Bottom Navigation */}
        <View className="mb-12 mt-auto flex-row items-end justify-between">
          <View className="gap-12">
            <ProgressDots
              className="ml-2"
              totalSteps={totalSteps}
              currentStep={currentScreenIndex}
              activeColor={isDark ? colors.primary[900] : colors.white}
            />

            <Button
              onPress={onSkip}
              label="Skip"
              className="bg-transparent active:opacity-60 dark:bg-transparent"
              textClassName="text-bold-nunito text-lg text-white dark:text-white"
            />
          </View>

          <Button
            onPress={() => goToNextScreen({})}
            label="Next"
            className="bottom-[-10px] mt-6 h-[56px] w-[150px] rounded-xl border-2 border-primary-900 bg-white pl-5 dark:bg-primary-900"
            textClassName="text-lg text-primary-900 dark:text-white"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const PremiumFeatures = () => {
  return (
    <View className="-mt-12 flex-1 justify-center gap-16 p-4">
      <View className="rotate-3 flex-row items-center justify-center rounded-xl bg-white p-6 shadow dark:bg-primary-900">
        <View className="mr-3  items-center justify-center rounded-full border bg-primary-100">
          <ScanIllustration fill={colors.neutral[500]} />
        </View>
        <Text className="font-bold-nunito text-lg text-primary-900">
          Get 10 Free Scans
        </Text>
      </View>

      <View className="-rotate-3 flex-row items-center justify-center rounded-xl bg-white p-6 shadow dark:bg-primary-900">
        <View className="mr-3  items-center justify-center rounded-full">
          <CrownIllustration />
        </View>
        <Text className="font-bold-nunito text-lg text-primary-900">
          Access to all premium features
        </Text>
      </View>

      <View className="rotate-3 flex-row items-center justify-center rounded-xl bg-white p-6 shadow dark:bg-primary-900">
        <View className="mr-3  items-center justify-center rounded-full bg-red-100">
          <NoAdsIllustration />
        </View>
        <Text className="font-bold-nunito text-lg text-primary-900">
          No ads
        </Text>
      </View>
    </View>
  );
};

export default FreeTrialPreview;
