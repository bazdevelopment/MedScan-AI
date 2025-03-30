import { TouchableOpacity, View } from 'react-native';

import { translate } from '@/core';
import { colors, Text } from '@/ui';
import { CloseIcon, ResizeIcon, Tick } from '@/ui/assets/icons';

import Icon from '../icon';
import { type IStudioToolbar } from './studio-toolbar.interface';

const StudioToolbar = ({ onClose, onAdjust, onConfirm }: IStudioToolbar) => {
  return (
    <View className="absolute inset-x-0 bottom-2 px-4 pb-6">
      <View className="flex-row items-center justify-between rounded-full bg-black/50 p-1">
        <Icon
          size={22}
          containerStyle="bg-black rounded-full p-2 border-[1.5px] border-white"
          onPress={onClose}
          icon={<CloseIcon color={colors.white} />}
        />

        <TouchableOpacity
          onPress={onAdjust}
          className="min-w-[150] flex-row items-center justify-center  rounded-full bg-white px-4 py-1.5"
        >
          <Text className="font-bold-nunito text-black dark:text-black">
            {translate(
              'components.ImageAnnotationStudio.studioToolbar.addSquare',
            )}
          </Text>
          <Icon
            size={22}
            containerStyle="rounded-full p-2.5 border-[1.5px] border-white"
            icon={<ResizeIcon color={colors.black} />}
          />
        </TouchableOpacity>

        <Icon
          size={22}
          containerStyle="bg-success-500 rounded-full p-2.5"
          onPress={onConfirm}
          icon={<Tick color={colors.black} />}
        />
      </View>
    </View>
  );
};

export default StudioToolbar;
