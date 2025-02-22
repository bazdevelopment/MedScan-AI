/* eslint-disable max-lines-per-function */
import { useNetInfo } from '@react-native-community/netinfo';
import * as QuickActions from 'expo-quick-actions';
import { useQuickActionRouting } from 'expo-quick-actions/router';
import { Redirect, router, Tabs } from 'expo-router';
import { firebaseAuth } from 'firebase/config';
import { checkForAppUpdate } from 'firebase/remote-config';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';

import { useUser, useUserPreferredLanguage } from '@/api/user/user.hooks';
import CustomHeader from '@/components/cusom-header';
import InitialLoadSpinner from '@/components/initial-load-spinner.ts';
import { TabBarIcon } from '@/components/tab-bar-icon';
import { translate, useIsFirstTime, useSelectedLanguage } from '@/core';
import { useCrashlytics } from '@/core/hooks/use-crashlytics';
import { useHaptic } from '@/core/hooks/use-haptics';
import { usePushNotificationToken } from '@/core/hooks/use-push-notification-token';
import { usePushNotificationSetup } from '@/core/hooks/use-push-notifications-setup';
import useRemoteConfig from '@/core/hooks/use-remote-config';
import { useRevenueCat } from '@/core/hooks/use-revenue-cat';
import { useUpdateUserSubscription } from '@/core/hooks/use-update-user-subscription';
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
  const { data: userInfo, isPending: isPendingUserinfo } = useUser(language);
  const [isFirstTime] = useIsFirstTime();
  const { language: actualLocalLanguage } = useSelectedLanguage();
  const userInfoLanguage = userInfo?.preferredLanguage ?? 'en';
  const { mutate: onUpdatePreferredLanguage } = useUserPreferredLanguage();
  const { isConnected } = useNetInfo();
  const bottomTabBarStyles = getBottomTabBarStyle(isDark);
  const { logEvent } = useCrashlytics();

  const { arePushNotificationEnabled, enablePushNotifications } =
    usePushNotificationSetup(); //todo: check if here is the best place to call the hook
  const { storeDeviceInfo } = usePushNotificationToken();

  const isLoggedIn = !!firebaseAuth.currentUser?.uid;

  const addSelectionHapticEffect = useHaptic('selection');
  const addHeavyHapticEffect = useHaptic('heavy');

  const { customerInfo } = useRevenueCat();
  useUpdateUserSubscription(customerInfo);

  useEffect(() => {
    // Guard clause: Skip logic if isConnected is null
    if (isConnected === null) return;

    if (!isConnected) {
      router.navigate('/no-internet');
      playSound('error');
      addHeavyHapticEffect?.();
    } else {
      modal.dismiss();
    }
  }, [isConnected, modal, addHeavyHapticEffect]);

  useEffect(() => {
    storeDeviceInfo();
  }, []);

  useEffect(() => {
    if (!arePushNotificationEnabled && isLoggedIn) {
      enablePushNotifications();
    }
  }, [isLoggedIn, arePushNotificationEnabled]);
  // Set an initializing state whilst Firebase connects

  useEffect(() => {
    if (
      userInfoLanguage &&
      userInfoLanguage !== actualLocalLanguage &&
      isLoggedIn
    )
      onUpdatePreferredLanguage({ language: actualLocalLanguage });
  }, []);

  useQuickActionRouting();

  const { MINIMUM_VERSION_ALLOWED } = useRemoteConfig();

  checkForAppUpdate(MINIMUM_VERSION_ALLOWED);

  useEffect(() => {
    QuickActions.setItems<QuickActions.Action>([
      {
        title: translate('deleteApp.title'),
        subtitle: translate('deleteApp.subtitle'),
        icon: 'heart_icon',
        id: '0',
        params: { href: '/rate' },
      },
    ]);
  }, []);

  // if (isPendingUserinfo || !customerInfo) return <InitialLoadSpinner />; //ADD THIS CONDITION WHEN IOS REVENUE CAT SETUP IS

  if (isPendingUserinfo) return <InitialLoadSpinner />;

  if (isFirstTime && !isLoggedIn) {
    logEvent(`User ${userInfo?.userId} is redirected to welcome screen`);
    return <Redirect href="/welcome" />;
  }
  if (!isFirstTime && !isLoggedIn) {
    logEvent(`User ${userInfo?.userId} is redirected to login screen`);
    return <Redirect href="/login" />;
  }

  if (!userInfo?.isOtpVerified) {
    logEvent(
      `User ${userInfo?.userId} is redirected to verify auth code screen`,
    );
    return <Redirect href="/verify-auth-code" />;
  }

  if (
    !userInfo?.isOnboarded ||
    (isFirstTime &&
      !userInfo?.isOnboarded &&
      isLoggedIn &&
      userInfo?.isOtpVerified) ||
    (isFirstTime && isLoggedIn && !userInfo?.isOnboarded)
  ) {
    logEvent(`User ${userInfo?.userId} is redirected to onboarding screen`);
    return <Redirect href="/onboarding" />;
  }

  if (!isLoggedIn) {
    logEvent(`User ${userInfo?.userId} is redirected to login screen`);
    return <Redirect href="/login" />;
  }

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
            listeners={{
              tabPress: () => {
                addSelectionHapticEffect?.();
                logEvent(
                  `User ${userInfo.userId} navigated to ${tab.screenName}`,
                );
              },
            }}
            options={{
              header: (props) =>
                tab.header && (
                  <CustomHeader
                    {...props}
                    title={tab.title}
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
    </>
  );
}
