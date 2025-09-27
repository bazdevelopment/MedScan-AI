import React from 'react';

import { Image, Text, View } from '@/ui';

const Branding = ({
  isLogoVisible = false,
  className,
  invertedColors,
}: {
  isLogoVisible?: boolean;
  className?: string;
  invertedColors?: boolean;
}) => {
  const textColor = invertedColors ? 'text-black' : 'text-white';
  return (
    <View className={`flex-row items-center ${className}`}>
      {isLogoVisible && (
        <View className="rounded-xl bg-primary-50 dark:bg-blackEerie dark:p-0">
          <Image
            source={require('../../../assets/icon_transparent.png')}
            className="h-[50px] w-[50px]"
          />
        </View>
      )}

      <View className={`${isLogoVisible ? 'ml-3' : ''}`}>
        <Text
          className={`text-center font-bold-nunito text-2xl tracking-[2px] ${textColor}`}
        >
          MedScan AI
        </Text>
        {/* <Text
          className={`text-center font-medium-nunito text-sm tracking-[3px] ${textColor}`}
        >
          ANALYZER
        </Text> */}
      </View>
    </View>
  );
};

export default Branding;
