/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-lines-per-function */
import { useNetInfo } from '@react-native-community/netinfo';
import { Redirect, Tabs } from 'expo-router';
import { firebaseAuth } from 'firebase/config';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';

import { useUser, useUserPreferredLanguage } from '@/api/user/user.hooks';
import CustomHeader from '@/components/cusom-header';
import { NoInternetConnectionModal } from '@/components/modals/no-internet-modal';
import { TabBarIcon } from '@/components/tab-bar-icon';
import { useSelectedLanguage } from '@/core';
import { useHaptic } from '@/core/hooks/use-haptics';
import { usePushNotificationSetup } from '@/core/hooks/use-push-notifications-setup';
import { tabScreens } from '@/core/navigation/tabs';
import { type ITabsNavigationScreen } from '@/core/navigation/tabs/tabs.interface';
import { getBottomTabBarStyle } from '@/core/navigation/tabs/tabs.styles';
import { playSound } from '@/core/utilities/play-sound';
import { colors, useModal } from '@/ui';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const modal = useModal();
  const { language } = useSelectedLanguage();
  const { data: userInfo } = useUser(language);
  const { language: actualLocalLanguage } = useSelectedLanguage();
  const userInfoLanguage = userInfo?.preferredLanguage ?? 'en';
  const { mutate: onUpdatePreferredLanguage } = useUserPreferredLanguage();

  const { isConnected } = useNetInfo();
  const bottomTabBarStyles = getBottomTabBarStyle(isDark);

  const { arePushNotificationEnabled, enablePushNotifications } =
    usePushNotificationSetup(); //todo: check if here is the best place to call the hook
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

  useEffect(() => {
    if (!arePushNotificationEnabled) {
      enablePushNotifications();
    }
  }, [arePushNotificationEnabled]);
  // Set an initializing state whilst Firebase connects

  useEffect(() => {
    if (userInfoLanguage && userInfoLanguage !== actualLocalLanguage)
      onUpdatePreferredLanguage({ language: actualLocalLanguage });
  }, []);
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: bottomTabBarStyles.tabBarContainer,
          tabBarLabelStyle: bottomTabBarStyles.tabBarLabel,
          tabBarInactiveTintColor: isDark ? colors.white : colors.charcoal[700],
          tabBarActiveTintColor: colors.primary[900],
        }}
      >
        {tabScreens.map((tab: ITabsNavigationScreen) => (
          <Tabs.Screen
            key={tab.id}
            name={tab.screenName}
            listeners={{ tabPress: addSelectionHapticEffect }}
            options={{
              header: (props) =>
                tab.header && (
                  <CustomHeader
                    {...props}
                    title={tab.title}
                    className="pt-16"
                    titlePosition="left"
                  />
                ),
              title: tab.title,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  icon={tab.icon(color, focused)}
                  focused={focused}
                  textClassName={`text-sm ${focused ? 'font-bold-nunito text-primary-900 dark:text-primary-900' : 'font-medium-nunito'} `}
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
