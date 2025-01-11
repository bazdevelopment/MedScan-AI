import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Dot from '@/components/dot';
import { colors, Text } from '@/ui';

import { type ISegmentedControlTab } from './segmented-control-tab.interface';

/**
 * Custom component for segmented control tab
 */
const SegmentedControlTab = ({
  option,
  isActive,
  tabInactiveColor,
  tabWidth,
  borderColor,
  withBorder,
  onPress,
}: ISegmentedControlTab) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      className="h-[80px] items-center justify-center self-center rounded-[20px]"
      onPress={() => onPress?.(option)}
      key={option.title}
      style={{
        width: tabWidth,
        borderColor,
        borderWidth: withBorder ? 3 : 0,
        backgroundColor: isActive ? colors.transparent : tabInactiveColor,
      }}
    >
      <View className="flex-col items-center gap-1">
        <Text
          className={` text-base text-gray-700  ${isActive ? 'text-white' : 'text-gray-600'}`}
        >
          {option.title}
        </Text>
        {Boolean(option.subtitle) && (
          <Text
            className={`mt-[-5px] font-bold-nunito text-lg ${isActive ? 'text-white' : 'text-black'}`}
          >
            {option.subtitle}
          </Text>
        )}
        <Dot
          color={isActive ? 'bg-white' : 'bg-primary-900'}
          size="w-2 h-2"
          additionalStyles="rounded-sm"
        />
      </View>
    </TouchableOpacity>
  );
};

export default SegmentedControlTab;
