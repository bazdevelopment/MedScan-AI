import React from 'react';

import { Image, Text, View } from '@/ui';

const Branding = ({ isLogoVisible = false }: { isLogoVisible?: boolean }) => {
  return (
    <View className="flex-row items-center">
      {isLogoVisible && (
        <View className="rounded-xl bg-slate-200 p-2">
          <Image
            source={require('../../../assets/icon-transparent.png')}
            className="h-[40px] w-[40px]"
          />
        </View>
      )}

      <View className={`${isLogoVisible ? 'ml-3' : ''}`}>
        <Text className="text-center font-extra-bold-nunito text-3xl tracking-[2px] text-white">
          X-Ray
        </Text>
        <Text className="text-center font-medium-nunito text-sm tracking-[3px] text-white">
          ANALYZER
        </Text>
      </View>
    </View>
  );
};

export default Branding;
