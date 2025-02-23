import React from 'react';
import { NativeModules } from 'react-native';
import RNRestart from 'react-native-restart';

import { translate } from '@/core';
import { Button, Text, View } from '@/ui';
import { NoInternetIllustration } from '@/ui/assets/illustrations';

const NoInternet = () => {
  const handleAppRestart = () => {
    if (__DEV__) NativeModules.DevSettings.reload();
    else RNRestart.restart();
  };
  return (
    <View className="flex-1  items-center dark:bg-blackEerie">
      <View className="top-[-10] mt-10 flex-1 items-center justify-center">
        <NoInternetIllustration />
      </View>

      <View className="bottom-10 w-full self-start px-6">
        <View className="px-2">
          <Text className="font-semibold-nunito text-3xl">
            {translate('rootLayout.screens.noInternetScreen.heading')}
          </Text>
          <Text className="mt-2 text-gray-600">
            {translate('rootLayout.screens.noInternetScreen.subheading')}
          </Text>
        </View>
        <View className="mt-2">
          <Button
            label={translate('general.tryAgain')}
            variant="default"
            className="mt-6 h-[62px] w-full rounded-full bg-blackEerie pl-5 active:bg-primary-700 dark:bg-primary-900"
            textClassName="text-lg text-center text-white dark:text-white"
            iconPosition="left"
            onPress={handleAppRestart}
          />
        </View>
      </View>
    </View>
  );
};

export default NoInternet;
