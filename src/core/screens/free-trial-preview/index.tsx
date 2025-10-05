/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';

import { translate } from '@/core/i18n';
import getDeviceSizeCategory from '@/core/utilities/get-device-size-category';
import { Button, colors, FocusAwareStatusBar, Text } from '@/ui';
import { requestAppRatingWithDelay } from '@/core/utilities/request-app-review';
import PremiumFeaturesOverview from '@/components/premium-features-overivew';
import FadeInView from '@/components/fade-in-view/fade-in-view';
import { StarIcon } from '@/ui/assets/icons/star';
import HorizontalLine from '@/ui/horizontal-line';
import Avatar from '@/components/avatar';
import { ArrowRightSharp } from '@/ui/assets/icons/arrow-right-sharp';
import { DEVICE_TYPE } from '@/core/utilities/device-type';

// Social Proof Component
const SocialProofCard = () => (
  <View className="rounded-2xl bg-white/90 dark:bg-charcoal-900 p-5">
    <View className="mb-1 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <View className="mr-3 h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-400 to-pink-400">
          <Avatar
            image={require('../../../ui/assets/images/portrait-female-doctor.png')}
            size="small"
            shape="circle"
          />
        </View>
        <View className="flex-row gap-4">
          <Text className="text-lg font-bold-nunito text-gray-900">
            Sophia B.
          </Text>
          <View className="flex-row gap-1">
            <StarIcon color={colors.warning[400]} fill={colors.warning[400]} />
            <StarIcon color={colors.warning[400]} fill={colors.warning[400]} />
            <StarIcon color={colors.warning[400]} fill={colors.warning[400]} />
            <StarIcon color={colors.warning[400]} fill={colors.warning[400]} />
            <StarIcon color={colors.warning[400]} fill={colors.warning[400]} />
          </View>
        </View>
      </View>
    </View>

    <Text className="text-base font-bold-nunito leading-5 ">
      {translate('rootLayout.screens.freeTrialPreview.review')}
    </Text>
    <Text className="mt-2 text-sm text-gray-900">
      {translate('rootLayout.screens.freeTrialPreview.reviewTrust')}
    </Text>
  </View>
);

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
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={
          isDark
            ? [colors.black, colors.charcoal[900]]
            : [colors.primary[900], '#a092e1']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.0, 1.0]}
        style={{ flex: 1 }}
      >
        {/* <FocusAwareStatusBar hidden /> */}

        <ScrollView
          className={`flex-1 px-5 ${DEVICE_TYPE.ANDROID && isVerySmallDevice ? 'pt-[10]' : 'pt-[44]'}`}
          showsVerticalScrollIndicator={false}
        >
          <Text className="mb-2 text-center font-bold-nunito text-4xl text-white">
            {translate('rootLayout.screens.freeTrialPreview.heading')}
          </Text>

          <Text className="mb-6 text-center font-semibold-nunito text-base== text-white">
            {translate('rootLayout.screens.freeTrialPreview.subheading')}
          </Text>
          <FadeInView delay={100}>
            <SocialProofCard />
          </FadeInView>
          <HorizontalLine className="mt-4 mb-3" />
          <PremiumFeaturesOverview />
        </ScrollView>
        {/* Bottom Navigation */}
        <View
          className={`bottom-10 px-6 items-center mt-auto flex-row items-end justify-between ${isVerySmallDevice ? 'mb-2' : 'mb-2'}`}
        >
          <View className={`${isVerySmallDevice ? 'gap-4' : 'gap-12'}`}>
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
            icon={
              <ArrowRightSharp color={colors.white} width={20} height={20} />
            }
            label={translate('general.continue')}
            className=" h-[56px] w-[150px] rounded-xl border-2 border-white/40 bg-primary-900  pl-5 dark:bg-primary-900"
            textClassName="text-lg text-white dark:text-white"
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default FreeTrialPreview;
