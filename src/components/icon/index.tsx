import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { type IIcon } from './icon.interface';

const Icon = ({
  icon,
  size = 24,
  color = 'black',
  label,
  labelStyle = '',
  containerStyle = '',
  iconContainerStyle = '',
  disabled = false,
  onPress,
}: IIcon) => {
  const Wrapper = onPress ? TouchableOpacity : View;

  // Clone the icon to dynamically adjust its size and color.
  const clonedIcon = React.cloneElement(icon, {
    width: size,
    height: size,
    fill: color,
  });

  return (
    <Wrapper
      onPress={onPress}
      className={`flex flex-col items-center ${containerStyle}`}
      disabled={disabled}
      // hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
    >
      <View className={iconContainerStyle}>{clonedIcon}</View>
      {label && (
        <Text className={`mt-1 text-sm text-gray-500 ${labelStyle}`}>
          {label}
        </Text>
      )}
    </Wrapper>
  );
};

export default Icon;
