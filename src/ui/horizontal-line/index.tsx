import React from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import colors from '../colors';
import { Text } from '../text';
import { type IHorizontalLine } from './horizontal-line.interface';

const HorizontalLine = ({
  text,
  className,
  color = colors.lightGray,
  thickness = 0.5,
}: IHorizontalLine) => {
  const containerStyle = twMerge(
    'flex-row items-center',
    className,
    Boolean(text) && 'gap-4',
  );

  const baseStyle = { borderColor: color, borderWidth: thickness };

  return (
    <View className={containerStyle}>
      <View className="flex-1" style={baseStyle} />
      {Boolean(text) && (
        <Text className="top-[-2px] text-gray-500">{text}</Text>
      )}
      <View className="flex-1" style={baseStyle} />
    </View>
  );
};

export default HorizontalLine;
