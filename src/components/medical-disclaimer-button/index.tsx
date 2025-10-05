import { translate } from '@/core';
import { colors, Text } from '@/ui';
import { ArrowRight } from '@/ui/assets/icons';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const MedicalDisclaimerButton = () => {
  return (
    <TouchableOpacity
      onPress={() => router.navigate('/medical-disclaimer')}
      className="mx-4 flex-row items-center gap-2 rounded-xl bg-warning-500/20 px-4 py-2.5 dark:bg-warning-500/20 self-start"
      activeOpacity={0.7}
    >
      <View className="h-6 w-6 items-center justify-center rounded-full bg-warning-400 dark:bg-warning-400">
        <Text className="text-sm font-bold-poppins text-black dark:text-black">
          !
        </Text>
      </View>
      <Text className="font-bold-nunito text-sm text-white dark:text-white">
        {translate('general.medicalDisclaimer')}
      </Text>
      <ArrowRight width={20} height={20} fill={colors.white} />
    </TouchableOpacity>
  );
};

export default MedicalDisclaimerButton;
