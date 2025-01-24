import { reloadAppAsync } from 'expo';
import React from 'react';

import { Button, Text, View } from '@/ui';
import { NoInternetIllustration } from '@/ui/assets/illustrations';

const NoInternet = () => {
  return (
    <View className="flex-1  items-center dark:bg-blackEerie">
      <View className="top-[-10] mt-10 flex-1 items-center justify-center">
        <Text>
          <NoInternetIllustration />
        </Text>
      </View>

      <View className="bottom-10 w-full self-start px-6">
        <View className="px-2">
          <Text className="font-semibold-nunito text-3xl">You are offline</Text>
          <Text className="mt-2 text-gray-600">
            Your connection seems to be unstable. Please verify your network
            status
          </Text>
        </View>
        <View className="mt-2">
          <Button
            label="Try again"
            variant="default"
            className="mt-6 h-[62px] w-full rounded-full bg-blackEerie pl-5 active:bg-primary-700 dark:bg-primary-900"
            textClassName="text-lg text-center text-white dark:text-white"
            iconPosition="left"
            onPress={reloadAppAsync}
          />
        </View>
      </View>
    </View>
  );
};

export default NoInternet;
