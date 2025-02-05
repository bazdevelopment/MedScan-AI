/* eslint-disable max-lines-per-function */
// Import  global CSS file
import '../../global.css';

import {
  NunitoSans_300Light,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_800ExtraBold,
} from '@expo-google-fonts/nunito-sans';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { router, SplashScreen, Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Toaster } from 'sonner-native';

import { APIProvider } from '@/api';
import CustomHeader from '@/components/cusom-header';
import Icon from '@/components/icon';
import { hydrateAuth, loadSelectedTheme, translate } from '@/core';
import { useNotificationListeners } from '@/core/hooks/use-notification-listeners';
import { useThemeConfig } from '@/core/utilities/use-theme-config';
import { colors } from '@/ui';
import { CloseIcon } from '@/ui/assets/icons';

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
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [fontsLoaded] = useFonts({
    inter: require('../../assets/fonts/Inter.ttf'),
    'Font-Regular': NunitoSans_400Regular,
    'Font-SemiBold': NunitoSans_600SemiBold,
    'Font-Light': NunitoSans_300Light,
    'Font-Bold': NunitoSans_700Bold,
    'Font-Medium': NunitoSans_400Regular,
    'Font-Extra-Bold': NunitoSans_800ExtraBold,
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
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen
          name="login"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="verify-auth-code"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="paywall"
          options={{
            headerShown: false,
            gestureEnabled: false,
            presentation: 'formSheet',
          }}
        />
        <Stack.Screen
          name="no-internet"
          options={{
            headerShown: false,
            gestureEnabled: false,
            presentation: 'fullScreenModal',
          }}
        />
        <Stack.Screen
          name="new-app-version"
          options={{
            headerShown: false,
            gestureEnabled: false,
            presentation: 'fullScreenModal',
          }}
        />

        <Stack.Screen
          name="scan-interpretation"
          options={{
            headerTitle: () => null,
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('rootLayout.screens.scanInterpretation.title')}
                className="pt-16"
                titlePosition="center"
                onGoBack={router.back}
                backIconColor={isDark ? colors.white : colors.black}
              />
            ),
          }}
        />

        <Stack.Screen
          name="file-preview"
          options={{
            header: (props) => (
              <CustomHeader
                {...props}
                title="Upload Scan"
                className="bg-white pt-20"
                titlePosition="center"
                onGoBack={router.back}
                backIconColor={isDark ? colors.white : colors.black}
              />
            ),
          }}
        />

        <Stack.Screen
          name="generate-report"
          options={{
            gestureEnabled: false,

            header: (props) => (
              <CustomHeader
                {...props}
                title="Report Result"
                className="bg-white pt-16"
                titlePosition="center"
                rightContent={
                  <Icon
                    size={20}
                    containerStyle="bg-black dark:bg-white rounded-full p-1 mt-12 mr-6"
                    onPress={() => router.push('/(tabs)/')}
                    //!keep router.push instead of router.navigate to prevent crash on android
                    icon={
                      <CloseIcon
                        color={isDark ? colors.primary[900] : colors.white}
                      />
                    }
                  />
                }
              />
            ),
          }}
        />

        <Stack.Screen
          name="notifications"
          options={{
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('rootLayout.screens.notifications.title')}
                className="bg-primary-50 pt-16"
                titlePosition="center"
                onGoBack={router.back}
                backIconColor={isDark ? colors.white : colors.black}
              />
            ),
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
          name="rate"
          options={{
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('rootLayout.screens.rate.title')}
                className="bg-white pt-16"
                titlePosition="center"
                onGoBack={router.back}
                backIconColor={isDark ? colors.white : colors.black}
              />
            ),
          }}
        />

        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('rootLayout.screens.profile.title')}
                className="bg-primary-900 pt-16"
                titlePosition="center"
                onGoBack={router.back}
                titleClassName="text-white"
              />
            ),
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
              <Toaster autoWiggleOnUpdate="toast-change" />
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
