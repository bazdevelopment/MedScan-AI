import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/ui';
import { CornerTopRight } from '@/ui/assets/vectors';
import { CornerBottomLeft } from '@/ui/assets/vectors/corner-bottom-left';

import { type IFreeTierStatus } from './free-tier-status.interface';

const FreeTierStatus = ({
  scansLeft,
  onUpgrade,
  className,
}: IFreeTierStatus) => {
  return (
    <View className={`flex-row items-center justify-between ${className}`}>
      <View className="flex-1 flex-row items-center space-x-3">
        <View className="h-[70] w-[70] items-center justify-center overflow-hidden rounded-xl bg-primary-900">
          <CornerTopRight
            style={{
              position: 'absolute',
              top: -5,
              right: -5,
            }}
          />

          <Text className="font-bold-nunito text-3xl text-white">
            {scansLeft}
          </Text>
          <CornerBottomLeft
            style={{ position: 'absolute', bottom: -5, left: -5 }}
          />
        </View>

        <View className="ml-4 mr-2 w-full flex-1 flex-col gap-1">
          <Text className="font-semibold-nunito text-2xl">Free scans</Text>
          <Text className="text-sm text-gray-600">
            Get unlimited access with our Pro plan
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onUpgrade}
        className="rounded-full bg-gray-900 p-4 dark:border-2 dark:border-primary-900 dark:shadow-sm"
      >
        <Text className="font-semibold-nunito text-base text-white">
          Upgrade to Pro
        </Text>
      </Pressable>
    </View>
  );
};

export default FreeTierStatus;
