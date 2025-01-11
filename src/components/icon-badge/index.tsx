import React from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Text } from '@/ui';

import { type IIconBadge } from './icon-badge.interface';

const IconBadge = ({
  icon,
  badgeValue,
  badgeTextClassName = '',
  badgeContainerClassName = '',
  className = '',
  showBadgeValue = false,
}: IIconBadge) => {
  const badgeContainerStyle = twMerge(
    'absolute -right-[2px] -top-[3px] flex h-[14px] w-[14px]  rounded-full bg-red-500',
    badgeContainerClassName,
    showBadgeValue && 'h-[20px] w-[20px] -right-2 -top-2',
  );

  const badgeTextStyle = twMerge(
    'text-[9px] mt-[1px] font-bold-nunito text-white w-full h-full text-center',
    badgeTextClassName,
  );

  return (
    <View className={`relative ${className}`}>
      {icon}
      {Boolean(badgeValue) && (
        <View className={badgeContainerStyle}>
          {showBadgeValue && badgeValue && (
            <Text className={badgeTextStyle}>{badgeValue}</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default IconBadge;
