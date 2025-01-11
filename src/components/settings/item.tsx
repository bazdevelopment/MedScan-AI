import * as React from 'react';

import type { TxKeyPath } from '@/core';
import { colors, Pressable, Text, View } from '@/ui';
import { ArrowRight } from '@/ui/assets/icons';

type ItemProps = {
  text: TxKeyPath;
  value?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
};

export const Item = ({ text, value, icon, onPress }: ItemProps) => {
  const isPressable = onPress !== undefined;
  return (
    <Pressable
      onPress={onPress}
      pointerEvents={isPressable ? 'auto' : 'none'}
      className="dark:bg-blackBeauty flex-1 flex-row items-center justify-between rounded-xl bg-primary-100 p-4"
    >
      <View className="ml-1 flex-row items-center">
        {icon && <View className="pr-2">{icon}</View>}
        <Text tx={text} className="font-semibold-nunito text-lg" />
      </View>
      <View className="flex-row items-center">
        <Text className="text-base text-neutral-600 dark:text-white">
          {value}
        </Text>
        {isPressable && (
          <View className="pl-2">
            <ArrowRight fill={colors.primary[900]} />
          </View>
        )}
      </View>
    </Pressable>
  );
};
