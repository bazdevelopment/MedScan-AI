import { StyleSheet } from 'react-native';

import { DEVICE_TYPE } from '@/core/utilities/device-type';
import { colors } from '@/ui';

export const getBottomTabBarStyle = (isDark: boolean) =>
  StyleSheet.create({
    tabBarContainer: {
      paddingTop: DEVICE_TYPE.IOS ? 15 : 0,
      backgroundColor: isDark ? colors.black : colors.white,
      height: DEVICE_TYPE.IOS ? 100 : 65,
      width: '100%',
      borderWidth: 0,
      borderTopWidth: 0,

      shadowColor: colors.black, // iOS shadow color
      shadowOffset: { width: 0, height: 5 }, // iOS shadow offset
      shadowOpacity: 0.4, // iOS shadow opacity
      shadowRadius: 10, // iOS shadow radius
      elevation: 5, // Android shadow
      ...(isDark && {
        borderTopColor: colors.charcoal[700],
        borderTopWidth: 1,
      }),
    },
    tabBarLabel: {
      color: 'red',
      display: 'none',
    },
  });
