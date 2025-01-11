// Chevron icon
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { colors } from '@/ui';
import { ArrowRight } from '@/ui/assets/icons';

import Icon from '../icon';

const CardWrapper = ({
  isEntirelyClickable = false,
  children,
  className = '',
  onPress,
  chevronColor = colors.white,
}) => {
  const Container = isEntirelyClickable ? TouchableOpacity : View;

  return (
    <Container
      onPress={isEntirelyClickable ? onPress : undefined}
      className={`flex-row items-center ${className}`}
    >
      {/* Left Content (children) */}
      <View className="flex-1">{children}</View>

      {/* Chevron Icon */}
      <Icon
        icon={<ArrowRight />}
        size={25}
        onPress={onPress}
        color={chevronColor}
      />
    </Container>
  );
};

export default CardWrapper;
