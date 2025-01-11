import React from 'react';
import { View } from 'react-native';

import {
  HeaderCornerFourth,
  HeaderCornerThird,
  HederCornerFirst,
  HederCornerSecond,
} from '@/ui/assets/vectors';

export const SnakeLine = ({
  rotate = 0,
  className,
  color,
}: {
  rotate?: number;
  className?: string;
  color?: string;
}) => {
  return (
    <View
      style={{
        transform: [{ rotate: `${rotate}deg` }],
      }}
      className={`${className}`}
    >
      <HederCornerFirst color={color} />
      <HederCornerSecond color={color} style={{ top: -13, right: -62 }} />
    </View>
  );
};

export const SnakeLineRotated = ({
  rotate = 0,
  className,
  color,
}: {
  className?: string;
  rotate?: number;
  color?: string;
}) => {
  return (
    <View
      style={{
        transform: [{ rotate: `${rotate}deg` }],
      }}
      className={`${className}`}
    >
      <HeaderCornerThird color={color} />
      <HeaderCornerFourth color={color} style={{ top: -69, right: -62 }} />
    </View>
  );
};
