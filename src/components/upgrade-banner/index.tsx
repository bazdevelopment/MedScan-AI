import React from 'react';
import { View } from 'react-native';

import { translate } from '@/core';
import { Button, Text } from '@/ui';

interface IUpgradeBanner {
  onUpgradePress: () => void;
  className?: string;
}

const UpgradeBanner = ({ onUpgradePress, className }: IUpgradeBanner) => {
  return (
    <View
      className={`flex-row items-center justify-between rounded-2xl border-4 border-primary-400 bg-primary-900 p-4 ${className}`}
    >
      <View className="flex-[1.3] gap-1">
        <Text className="font-bold-nunito text-2xl text-white">
          {translate('components.UpgradeBanner.heading')}
        </Text>
        <Text className="font-semibold-nunito text-base  text-white ">
          {translate('components.UpgradeBanner.subheading')}
        </Text>
      </View>

      <View className="flex-1">
        <Button
          label={translate('general.upgradePlan')}
          className="h-[54] rounded-full border-[3px] border-primary-700 px-6 dark:bg-blackEerie"
          textClassName="dark:text-white text-center"
          onPress={onUpgradePress}
        />
      </View>
    </View>
  );
};

export default UpgradeBanner;
