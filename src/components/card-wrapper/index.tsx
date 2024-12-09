// Chevron icon
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ArrowRight } from '@/ui/assets/icons';

import Icon from '../icon';

const CardWrapper = ({
  isEntirelyClickable = true,
  children,
  className = '',
  onPress,
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
        iconContainerStyle="left-4"
        onPress={onPress}
      />
    </Container>
  );
};

export default CardWrapper;
