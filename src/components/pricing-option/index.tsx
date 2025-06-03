import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { DEVICE_TYPE } from '@/core';
import { Text } from '@/ui';

//!wrapped is needed because on android blur view doesn't support nested views
const Wrapper = ({ children }: { children: React.ReactElement }) =>
  DEVICE_TYPE.IOS ? (
    <BlurView
      blurAmount={10}
      className="overflow-hidden rounded-3xl p-4"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 10,
      }}
    >
      {children}
    </BlurView>
  ) : (
    <View className="">{children}</View>
  );

const PricingOption = ({ plan, selectedPlan, onSelectOption, badge }) => {
  return (
    <Wrapper>
      <TouchableOpacity onPress={onSelectOption} activeOpacity={0.7}>
        <View
          className={`relative flex-row items-center justify-between rounded-xl p-5 ${selectedPlan === plan.id ? 'border-2 border-white' : ''}`}
        >
          {badge && (
            <View className="absolute right-28 top-2.5 rounded-full bg-blue-500 px-2 py-1">
              <Text className="font-bold-nunito text-sm text-white">
                {badge}
              </Text>
            </View>
          )}

          <View className="flex-1 flex-row items-center">
            <View className="mr-4 h-6 w-6 items-center justify-center rounded-full border-2 border-white/30">
              {selectedPlan === plan.id && (
                <View className="h-3 w-3 rounded-full  bg-white" />
              )}
            </View>
            <View>
              <Text className="font-bold-nunito text-lg text-white">
                {plan.title}
              </Text>
              <Text className="mr-10 text-sm text-white">{plan.subtitle}</Text>
            </View>
          </View>

          <Text className="font-semibold-nunito text-lg text-white">
            {plan.price}
          </Text>
        </View>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default PricingOption;
