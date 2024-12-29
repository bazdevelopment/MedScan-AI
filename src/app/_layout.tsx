/* eslint-disable max-lines-per-function */
// Import  global CSS file
import '../../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as QuickActions from 'expo-quick-actions';
import { useQuickActionRouting } from 'expo-quick-actions/router';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Toaster } from 'sonner-native';

import { APIProvider } from '@/api';
import { hydrateAuth, loadSelectedTheme, translate } from '@/core';
import { useNotificationListeners } from '@/core/hooks/use-notification-listeners';
import { useThemeConfig } from '@/core/utilities/use-theme-config';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

hydrateAuth();
loadSelectedTheme();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldShowAlert: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  useQuickActionRouting();

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

  const [fontsLoaded] = useFonts({
    inter: require('../../assets/fonts/Inter.ttf'),
  });

  useNotificationListeners();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="scan-interpretation"
          options={{
            headerBackTitle: translate(
              'rootLayout.screens.scanInterpretation.headerBackTitle',
            ),
            title: translate('rootLayout.screens.scanInterpretation.title'),
          }}
        />

        <Stack.Screen
          name="modals-stack"
          options={{
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="notifications"
          options={{
            title: translate('rootLayout.screens.notifications.title'),
            headerBackTitle: translate('general.back'),
          }}
        />
        <Stack.Screen
          name="terms-of-service"
          options={{
            title: translate('rootLayout.screens.termsOfService.title'),
            headerBackTitle: translate('general.back'),
          }}
        />
        <Stack.Screen
          name="privacy-policy"
          options={{
            title: translate('rootLayout.screens.privacyPolicy.title'),
            headerBackTitle: translate('general.back'),
          }}
        />
        <Stack.Screen
          name="share"
          options={{
            title: translate('rootLayout.screens.share.title'),
            headerBackTitle: translate('general.back'),
          }}
        />
        <Stack.Screen
          name="rate"
          options={{
            title: translate('rootLayout.screens.rate.title'),
            headerBackTitle: translate('general.back'),
          }}
        />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();

  return (
    <GestureHandlerRootView
      style={styles.container}
      className={theme.dark ? `dark` : undefined}
    >
      <KeyboardProvider>
        <ThemeProvider value={theme}>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              <Toaster autoWiggleOnUpdate="always" />
            </BottomSheetModalProvider>
          </APIProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
