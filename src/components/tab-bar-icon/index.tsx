import { View } from 'react-native';

import { Text } from '@/ui';

import { type ITabBarIcon } from './tab-bar-icon.interface';

export const TabBarIcon = ({
  icon,
  _focused,
  textClassName,
  title,
}: ITabBarIcon) => {
  return (
    <View className="flex-col items-center gap-2">
      {icon}

      <Text className={textClassName}>{title}</Text>
    </View>
  );
};
