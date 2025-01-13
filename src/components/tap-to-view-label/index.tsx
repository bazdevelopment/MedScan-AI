import React from 'react';

import { Text, TouchableOpacity, View } from '@/ui';
import { EyeIcon } from '@/ui/assets/icons';

import Icon from '../icon';

const TabToViewLabel = ({
  className,
  onTapToView,
}: {
  className: string;
  onTapToView: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onTapToView}
      className={`${className} flex-row items-center`}
    >
      <View className="">
        <Text className="right-[-12px] overflow-hidden rounded-2xl bg-primary-900 py-[4px] pl-4 pr-5 font-semibold-nunito text-sm text-white">
          Tap To View
        </Text>
      </View>
      <Icon
        containerStyle="w-[40px] h-[40px] bg-white items-center justify-center rounded-xl"
        icon={<EyeIcon />}
        size={25}
      />
    </TouchableOpacity>
  );
};

export default TabToViewLabel;
