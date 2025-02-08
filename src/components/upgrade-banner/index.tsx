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
      className={`flex-row items-center justify-between rounded-2xl border-4 border-primary-400 bg-primary-900 px-5 py-4 ${className}`}
    >
      <View className="gap-2">
        <Text className="font-bold-nunito text-2xl text-white">
          {translate('components.UpgradeBanner.heading')}
        </Text>
        <Text className="font-semibold-nunito text-lg text-white">
          {translate('components.UpgradeBanner.subheading')}
        </Text>
      </View>

      <Button
        label={translate('general.upgradePlan')}
        className="h-[52] rounded-full border-[3px] border-primary-700 px-6 dark:bg-blackEerie"
        textClassName="dark:text-white"
        onPress={onUpgradePress}
      />
    </View>
  );
};

export default UpgradeBanner;
