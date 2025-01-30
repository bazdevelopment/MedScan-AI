/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-lines-per-function */
import { useNetInfo } from '@react-native-community/netinfo';
import * as QuickActions from 'expo-quick-actions';
import { useQuickActionRouting } from 'expo-quick-actions/router';
import { Redirect, router, Tabs } from 'expo-router';
import { firebaseAuth } from 'firebase/config';
import { checkForAppUpdate } from 'firebase/remote-config';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing } from 'react-native';

import { useUser, useUserPreferredLanguage } from '@/api/user/user.hooks';
import Branding from '@/components/branding';
import CustomHeader from '@/components/cusom-header';
import { SnakeLine, SnakeLineRotated } from '@/components/snake-line';
import { TabBarIcon } from '@/components/tab-bar-icon';
import { translate, useIsFirstTime, useSelectedLanguage } from '@/core';
import { useHaptic } from '@/core/hooks/use-haptics';
import { usePushNotificationSetup } from '@/core/hooks/use-push-notifications-setup';
import useRealtimeConfig from '@/core/hooks/use-real-time-config';
import { tabScreens } from '@/core/navigation/tabs';
import { type ITabsNavigationScreen } from '@/core/navigation/tabs/tabs.interface';
import { getBottomTabBarStyle } from '@/core/navigation/tabs/tabs.styles';
import { playSound } from '@/core/utilities/play-sound';
import { colors, useModal, View } from '@/ui';

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

  const { arePushNotificationEnabled, enablePushNotifications } =
    usePushNotificationSetup(); //todo: check if here is the best place to call the hook
  const isLoggedIn = !!firebaseAuth.currentUser?.uid;

  const addSelectionHapticEffect = useHaptic('selection');
  const addHeavyHapticEffect = useHaptic('heavy');

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
    if (!arePushNotificationEnabled) {
      enablePushNotifications();
    }
  }, []);
  // Set an initializing state whilst Firebase connects

  useEffect(() => {
    if (userInfoLanguage && userInfoLanguage !== actualLocalLanguage)
      onUpdatePreferredLanguage({ language: actualLocalLanguage });
  }, []);
  // console.log('isOnboarded', isOnboarded);
  useQuickActionRouting();

  const { MINIMUM_VERSION_ALLOWED } = useRealtimeConfig();

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

  if (isPendingUserinfo) return <ProgressSpinner />;

  if (isFirstTime && !isLoggedIn) {
    return <Redirect href="/welcome" />;
  }

  if (
    isFirstTime &&
    !userInfo?.isOnboarded &&
    isLoggedIn &&
    userInfo?.isOtpVerified
  ) {
    return <Redirect href="/onboarding" />;
  }

  if (!userInfo?.isOtpVerified) {
    return <Redirect href="/verify-auth-code" />;
  }

  if (!isLoggedIn) {
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
    </>
  );
}

const ProgressSpinner = () => {
  const [loadingMessage, setLoadingMessage] = useState(
    'Loading your personalized experience...',
  );

  const fadeValue = useRef(new Animated.Value(0)).current;

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    // Update the loading message in intervals
    const messages = [
      'Synchronizing systems...',
      'Processing your data...',
      'Almost ready, just a moment...',
    ];
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 2000);

    // Fade in and fade out effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(fadeValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    return () => {
      clearInterval(messageInterval);
    };
  }, [fadeValue]);

  return (
    <View className="flex-1 items-center justify-center gap-3 bg-primary-900 dark:bg-blackEerie">
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute right-[150] top-[70]"
      />
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute right-[50] top-[40]"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute left-[40] top-0"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute left-[170] top-[-120]"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute left-[200] top-[-20]"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute right-[-10] top-[-20]"
      />
      <Branding isLogoVisible className="top-[-25]" />
      {/* Rotating Spinner */}
      <ActivityIndicator
        size="large"
        className=" items-center justify-center"
        color={isDark ? colors.charcoal[300] : colors.charcoal[100]}
      />

      {/* Fading Loading Message */}
      <Animated.Text
        className="mt-4 font-medium text-white"
        style={{ opacity: fadeValue }}
      >
        {loadingMessage}
      </Animated.Text>
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute bottom-[-10] z-[-1]"
      />
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute bottom-[-10] left-[-10px] z-[-1]"
      />
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute bottom-[120] left-[-50px] z-[-1]"
      />

      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute bottom-0 right-[-10] z-[-1]"
      />
    </View>
  );
};
