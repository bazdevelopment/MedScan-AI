import { View } from 'react-native';

import { MAX_FREE_SCANS } from '@/constants/limits';
import { translate } from '@/core';
import getDeviceSizeCategory from '@/core/utilities/get-device-size-category';
import { colors, Text } from '@/ui';
import {
  CrownIllustration,
  NoAdsIllustration,
  ScanIllustration,
} from '@/ui/assets/illustrations';

const PremiumFeaturesOverview = () => {
  const { isVerySmallDevice } = getDeviceSizeCategory();

  return (
    <View
      className={`flex-1 justify-center p-4 ${isVerySmallDevice ? 'mt-4 gap-8' : 'gap-16'}`}
    >
      <View
        className={`rotate-3 flex-row items-center justify-center rounded-xl bg-white shadow dark:bg-primary-900 ${isVerySmallDevice ? 'p-3' : 'p-6'}`}
      >
        <View className="mr-3  items-center justify-center rounded-full border bg-primary-100">
          <ScanIllustration
            fill={colors.neutral[500]}
            width={isVerySmallDevice ? 30 : 52}
            height={isVerySmallDevice ? 30 : 52}
          />
        </View>
        <Text
          className={`font-bold-nunito text-lg text-primary-900 ${isVerySmallDevice ? 'text-xs' : 'text-lg'}`}
        >
          {translate('components.PremiumFeaturesOverview.first', {
            freeScans: MAX_FREE_SCANS,
          })}
        </Text>
      </View>

      <View
        className={`-rotate-3 flex-row items-center justify-center rounded-xl bg-white shadow dark:bg-primary-900 ${isVerySmallDevice ? 'p-3' : 'p-6'}`}
      >
        <View className="mr-3  items-center justify-center rounded-full">
          <CrownIllustration
            width={isVerySmallDevice ? 30 : 45}
            height={isVerySmallDevice ? 30 : 45}
          />
        </View>
        <Text
          className={`font-bold-nunito text-lg text-primary-900 ${isVerySmallDevice ? 'text-xs' : 'text-lg'}`}
        >
          {translate('components.PremiumFeaturesOverview.second')}
        </Text>
      </View>

      <View
        className={`rotate-3 flex-row items-center justify-center rounded-xl bg-white shadow dark:bg-primary-900 ${isVerySmallDevice ? 'p-3' : 'p-6'}`}
      >
        <View className="mr-3  items-center justify-center rounded-full bg-red-100">
          <NoAdsIllustration
            width={isVerySmallDevice ? 30 : 52}
            height={isVerySmallDevice ? 30 : 52}
          />
        </View>
        <Text
          className={`font-bold-nunito text-lg text-primary-900 ${isVerySmallDevice ? 'text-xs' : 'text-lg'}`}
        >
          {translate('components.PremiumFeaturesOverview.third')}
        </Text>
      </View>
    </View>
  );
};

export default PremiumFeaturesOverview;
