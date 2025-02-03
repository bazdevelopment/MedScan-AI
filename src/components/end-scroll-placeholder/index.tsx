import LottieView from 'lottie-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { translate } from '@/core';
import { Text } from '@/ui';

import { endScrollPlaceholderStyle } from './end-scoll-placeholder.styles';
import { type IEndScrollPlaceholder } from './end-scroll-placeholder.interface';

export const EndScrollPlaceholder = ({
  onScrollToTop,
}: IEndScrollPlaceholder) => {
  return (
    <View className=" items-center justify-center">
      <TouchableOpacity onPress={onScrollToTop}>
        <LottieView
          source={require('assets/lottie/scroll-top-animation.json')}
          autoPlay
          loop
          style={endScrollPlaceholderStyle.scrollTopAnimation}
        />
        <Text className="text-center top-[-30] text-sm">
          {translate('components.EndScrollPlaceholder.scrollToTop')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
