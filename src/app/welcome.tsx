import { Link, router } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

import Branding from '@/components/branding';
import { translate } from '@/core';
import getDeviceSizeCategory from '@/core/utilities/get-device-size-category';
import { Button, SafeAreaView, Text } from '@/ui';
import { WelcomeIllustration } from '@/ui/assets/illustrations';

const Welcome = () => {
  const { isVerySmallDevice } = getDeviceSizeCategory();
  return (
    <ScrollView contentContainerClassName="bg-primary-50 dark:bg-blackEerie">
      <SafeAreaView>
        <View className="items-center justify-center px-6 pb-32 pt-14 dark:bg-blackEerie">
          <Branding isLogoVisible invertedColors />
          <Text className="my-10 text-center font-bold-nunito text-[32px] text-primary-900">
            {translate('rootLayout.screens.welcome.heading')}
          </Text>

          <WelcomeIllustration
            width={isVerySmallDevice ? 180 : 261}
            height={isVerySmallDevice ? 175 : 268}
          />
          <View className="mt-14 w-full">
            <Button
              label={translate('rootLayout.screens.welcome.startButton')}
              variant="default"
              className="h-[55px] w-full rounded-xl bg-primary-900 pl-5 dark:bg-primary-900"
              textClassName="font-semibold-nunito text-lg dark:text-white"
              iconPosition="left"
              onPress={() => router.navigate('/login')}
            />
            <Button
              label={translate('rootLayout.screens.welcome.accountButton')}
              variant="default"
              className="h-[55px] w-full rounded-xl border-2 border-primary-900 bg-white pl-5 dark:bg-primary-200"
              textClassName="text-lg text-center text-primary-900"
              iconPosition="left"
              onPress={() => router.navigate('/login')}
            />
          </View>

          <View className="mt-6 w-full flex-row flex-wrap items-center justify-center px-12">
            <Text className="text-sm">
              {translate('rootLayout.screens.login.agreeingMessage')}{' '}
            </Text>
            <Link href="/terms-of-service" className="text-sm text-primary-900">
              {translate('rootLayout.screens.login.termsAndConditions')}
            </Link>
            <Text className="text-sm"> {translate('general.and')} </Text>
            <Link href="/privacy-policy" className="text-sm text-primary-900">
              {translate('rootLayout.screens.login.privacyPolicy')}
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Welcome;
