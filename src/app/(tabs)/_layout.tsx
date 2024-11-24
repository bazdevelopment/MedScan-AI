/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-lines-per-function */
import { useNetInfo } from '@react-native-community/netinfo';
import { Redirect, Tabs } from 'expo-router';
import { firebaseAuth } from 'firebase/config';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';

import { NoInternetConnectionModal } from '@/components/modals/no-internet-modal';
import { TabBarIcon } from '@/components/tab-bar-icon';
import { useHaptic } from '@/core/hooks/use-haptics';
import { tabScreens } from '@/core/navigation/tabs';
import { type ITabsNavigationScreen } from '@/core/navigation/tabs/tabs.interface';
import { getBottomTabBarStyle } from '@/core/navigation/tabs/tabs.styles';
import { playSound } from '@/core/utilities/play-sound';
import { colors, useModal } from '@/ui';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const modal = useModal();

  const { isConnected } = useNetInfo();
  const isDark = colorScheme === 'dark';
  const bottomTabBarStyles = getBottomTabBarStyle(isDark);

  const isLoggedIn = !!firebaseAuth.currentUser?.uid;
  const addSelectionHapticEffect = useHaptic('selection');
  const addHeavyHapticEffect = useHaptic('heavy');

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  useEffect(() => {
    // Guard clause: Skip logic if isConnected is null
    if (isConnected === null) return;

    if (!isConnected) {
      modal.present();
      playSound('error');
      addHeavyHapticEffect?.();
    } else {
      modal.dismiss();
    }
  }, [isConnected, modal, addHeavyHapticEffect]);

  return (
    <>
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
            listeners={{ tabPress: addSelectionHapticEffect }}
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
      <NoInternetConnectionModal ref={modal.ref} />
    </>
  );
}
