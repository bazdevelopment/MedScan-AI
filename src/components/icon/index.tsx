import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { type IIcon } from './icon.interface';

const Icon = ({
  icon,
  size = 24,
  color = 'black',
  label,
  labelStyle = '',
  containerStyle = '',
  iconContainerStyle = '',
  onPress,
}: IIcon) => {
  const Wrapper = onPress ? Pressable : View;

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
      {...(onPress && { android_ripple: { color: '#ccc', borderless: true } })}
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
