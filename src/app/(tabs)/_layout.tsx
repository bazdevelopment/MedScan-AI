/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-lines-per-function */
import { useNetInfo } from '@react-native-community/netinfo';
import { Redirect, Tabs } from 'expo-router';
import { firebaseAuth } from 'firebase/config';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { Platform, Vibration } from 'react-native';
import { type ToastProps } from 'sonner-native/lib/typescript/commonjs/src/types';

import { TabBarIcon } from '@/components/tab-bar-icon';
import Toast from '@/components/toast';
import { tabScreens } from '@/core/navigation/tabs';
import { type ITabsNavigationScreen } from '@/core/navigation/tabs/tabs.interface';
import { getBottomTabBarStyle } from '@/core/navigation/tabs/tabs.styles';
import { playSound } from '@/core/utilities/play-sound';
import { colors } from '@/ui';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bottomTabBarStyles = getBottomTabBarStyle(isDark);

  const isLoggedIn = !!firebaseAuth.currentUser?.uid;

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  const { isConnected } = useNetInfo();

  useEffect(() => {
    // Guard clause: Skip logic if isConnected is null
    if (isConnected === null) return;
    if (!isConnected) {
      Toast.error('You do not have internet connection', {
        title: 'Thi is a toast for internet connection',
        position: 'bottom-center',
        closeButton: true,
        duration: Infinity,
        dismissible: false,
      } as ToastProps);
      playSound('error');
      Vibration.vibrate(Platform.OS === 'ios' ? [0, 500] : 500);
    } else {
      Toast.dismiss();
    }
  }, [isConnected]);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: bottomTabBarStyles.tabBarContainer,
        tabBarLabelStyle: bottomTabBarStyles.tabBarLabel,
        tabBarInactiveTintColor: isDark ? colors.white : colors.charcoal[700],
      }}
    >
      {tabScreens.map((tab: ITabsNavigationScreen) => (
        <Tabs.Screen
          key={tab.id}
          name={tab.screenName}
          options={{
            header: () => null,
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                icon={tab.icon(color, focused)}
                focused={focused}
                textClassName={`text-xs font-medium text-[${color}]`}
                title={tab.title}
              />
            ),
            tabBarTestID: tab.tabBarTestID,
          }}
        />
      ))}
    </Tabs>
  );
}
