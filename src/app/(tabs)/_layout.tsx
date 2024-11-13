/* eslint-disable max-lines-per-function */
import { Redirect, Tabs } from 'expo-router';
import { firebaseAuth } from 'firebase/config';
import { useColorScheme } from 'nativewind';
import React from 'react';

import { TabBarIcon } from '@/components/tab-bar-icon';
import { tabScreens } from '@/core/navigation/tabs';
import { type ITabsNavigationScreen } from '@/core/navigation/tabs/tabs.interface';
import { getBottomTabBarStyle } from '@/core/navigation/tabs/tabs.styles';
import { colors } from '@/ui';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bottomTabBarStyles = getBottomTabBarStyle(isDark);

  const isLoggedIn = !!firebaseAuth.currentUser?.uid;

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

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
