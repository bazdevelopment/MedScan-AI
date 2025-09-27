/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';

import PremiumFeaturesOverview from '@/components/premium-features-overivew';
import { SnakeLine, SnakeLineRotated } from '@/components/snake-line';
import { translate } from '@/core/i18n';
import { DEVICE_TYPE } from '@/core/utilities/device-type';
import getDeviceSizeCategory from '@/core/utilities/get-device-size-category';
import { Button, colors, FocusAwareStatusBar, Text } from '@/ui';
import { requestAppRatingWithDelay } from '@/core/utilities/request-app-review';

const FreeTrialPreview = ({
  totalSteps,
  currentScreenIndex,
  goToNextScreen,
  onSkip,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { isVerySmallDevice } = getDeviceSizeCategory();

  useEffect(() => {
    requestAppRatingWithDelay(500);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary-900 dark:bg-blackEerie">
      <FocusAwareStatusBar hidden />
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
        className="absolute right-[-10] top-[-20]"
      />
      <View
        className={`flex-1 px-6 pt-8 ${DEVICE_TYPE.ANDROID && isVerySmallDevice ? 'pt-[10]' : 'pt-[40]'}`}
      >
        <Text className="font-bold-nunito text-[32px]  text-white">
          {translate('rootLayout.screens.freeTrialPreview.heading')}
        </Text>

        <Text className="mb-1 mt-2 text-lg text-white">
          {translate('rootLayout.screens.freeTrialPreview.subheading')}
        </Text>

        <PremiumFeaturesOverview />

        {/* Bottom Navigation */}
        <View
          className={`mb-12 mt-auto flex-row items-end justify-between ${isVerySmallDevice ? 'mb-2' : 'mb-12'}`}
        >
          <View className={`${isVerySmallDevice ? 'gap-4' : 'gap-12'}`}>
            {/* <ProgressDots
              className="ml-2"
              totalSteps={totalSteps}
              currentStep={currentScreenIndex}
              activeColor={isDark ? colors.primary[900] : colors.white}
            /> */}

            <Button
              onPress={onSkip}
              label={translate('general.skip')}
              className="bg-transparent active:opacity-60 dark:bg-transparent"
              textClassName="font-bold-nunito text-lg text-white dark:text-white"
            />
          </View>

          <Button
            onPress={() =>
              router.navigate({
                pathname: '/paywall-new',
                params: { allowAppAccess: true },
              })
            }
            label={translate('general.next')}
            className="bottom-[-10px] mt-6 h-[56px] w-[150px] rounded-xl border-2 border-primary-900 bg-white pl-5 dark:bg-primary-900"
            textClassName="text-lg text-primary-900 dark:text-white"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FreeTrialPreview;
