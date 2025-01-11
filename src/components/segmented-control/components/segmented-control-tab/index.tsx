import React from 'react';
import { TouchableOpacity, View } from 'react-native';

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
      className="h-[50px] items-center justify-center self-center rounded-[10px]"
      onPress={() => onPress?.(option)}
      key={option.title}
      style={{
        width: tabWidth,
        borderColor,
        borderWidth: withBorder ? 0.5 : 0,
        backgroundColor: isActive ? colors.transparent : tabInactiveColor,
      }}
    >
      <View className="flex-col items-center gap-[-5px]">
        <Text
          className={`font-bold-nunito text-sm ${isActive ? 'text-white' : 'text-black'}`}
        >
          {option.title}
        </Text>
        {Boolean(option.subtitle) && (
          <Text
            className={`font-bold-nunito text-sm ${isActive ? 'text-white' : 'text-black'}`}
          >
            {option.subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SegmentedControlTab;
