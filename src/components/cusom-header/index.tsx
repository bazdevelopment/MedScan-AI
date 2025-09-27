/* eslint-disable max-lines-per-function */
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
  titleClassName,
  backIconColor = colors.black,
}: ICustomHeader) => {
  return (
    <View
      className={twMerge(
        'flex-row items-center',
        className,
        DEVICE_TYPE.ANDROID && 'pt-[40px] pb-8',
        DEVICE_TYPE.IOS && 'pt-[55px] pb-5',
      )}
    >
      {/* Left/Back Button */}
      <View className="flex-row items-center">
        {!!onGoBack && (
          <TouchableOpacity
            onPress={onGoBack}
            className="z-1 absolute ml-4 rounded-xl border border-slate-300 p-2 dark:border-2 "
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeftIcon
              color={backIconColor || colors.white}
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
          'w-full z-[-1]',
          titlePosition === 'left'
            ? 'items-start'
            : titlePosition === 'right'
              ? 'items-end pr-4'
              : 'items-center',
        )}
      >
        {titlePosition !== 'left' && (
          <Text
            className={`max-w-[70%] text-center font-bold-nunito text-2xl text-gray-800 z-10 ${titleClassName}`}
          >
            {title}
          </Text>
        )}
      </View>

      {/* Right Content */}
      <View className="absolute right-0 border-red-200">{rightContent}</View>
    </View>
  );
};

export default CustomHeader;
