import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { DEVICE_TYPE } from '@/core';
import { colors, Text } from '@/ui';
import { ChevronLeftIcon } from '@/ui/assets/icons';

import { type ICustomHeader } from './custom-header.interface';

const CustomHeader = ({
  title,
  onGoBack,
  rightContent,
  className,
  titlePosition = 'center', // Default position is 'center'
  ...props
}: ICustomHeader) => {
  return (
    <View
      className={twMerge(
        'flex-row items-center bg-slate-50 dark:bg-blackEerie py-3',
        className,
        DEVICE_TYPE.ANDROID && 'mt-[-20px]',
      )}
    >
      {/* Left/Back Button */}
      <View className="flex-row items-center">
        {!!onGoBack && (
          <TouchableOpacity
            onPress={onGoBack}
            className="absolute ml-4 rounded-xl border border-slate-300 p-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeftIcon
              color={colors.charcoal[700]}
              width={24}
              height={24}
            />
          </TouchableOpacity>
        )}
        {titlePosition === 'left' && !onGoBack && (
          <Text className="ml-4 font-bold-nunito text-3xl text-gray-800">
            {title}
          </Text>
        )}
        {titlePosition === 'left' && onGoBack && (
          <Text className="ml-20 font-bold-nunito text-2xl text-gray-800">
            {title}
          </Text>
        )}
      </View>

      {/* Title */}
      <View
        className={twMerge(
          'w-full',
          titlePosition === 'left'
            ? 'items-start'
            : titlePosition === 'right'
              ? 'items-end pr-4'
              : 'items-center',
        )}
      >
        {titlePosition !== 'left' && (
          <Text className="font-bold-nunito text-2xl text-gray-800">
            {title}
          </Text>
        )}
      </View>

      {/* Right Content */}
      <View className="w-10">{rightContent}</View>
    </View>
  );
};

export default CustomHeader;
