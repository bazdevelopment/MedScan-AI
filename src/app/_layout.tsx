/* eslint-disable max-lines-per-function */
// Import  global CSS file
// import '../../global.css';
function loadGlobalCSS() {
  try {
    require('../../global.css');
  } catch (error) {
    console.log('error loading global css', error);
  }
}

loadGlobalCSS();

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
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Toaster } from 'sonner-native';

import { APIProvider } from '@/api';
import CustomHeader from '@/components/cusom-header';
import Icon from '@/components/icon';
import { loadSelectedTheme, translate } from '@/core';
import { useNotificationListeners } from '@/core/hooks/use-notification-listeners';
import { useThemeConfig } from '@/core/utilities/use-theme-config';
import { colors } from '@/ui';
import { CloseIcon } from '@/ui/assets/icons';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

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

  useNotificationListeners();

  const [fontsLoaded] = useFonts({
    'Font-Regular': NunitoSans_400Regular,
    'Font-SemiBold': NunitoSans_600SemiBold,
    'Font-Light': NunitoSans_300Light,
    'Font-Bold': NunitoSans_700Bold,
    'Font-Medium': NunitoSans_400Regular,
    'Font-Extra-Bold': NunitoSans_800ExtraBold,
  });

  const [appIsReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Keep the splash screen visible while we load fonts
        await SplashScreen.preventAutoHideAsync();

        // Check if fonts are loaded
        if (fontsLoaded) {
          setAppReady(true);
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.error('Error preparing app:', error);
      }
    };

    prepareApp();

    // Fallback: Hide splash screen after 3 seconds even if fonts are not loaded because sometimes I notices the app remains stuck on splash screen because the fonts were not loaded (mainly android)
    const timeout = setTimeout(async () => {
      setAppReady(true);
      await SplashScreen.hideAsync();
      setAppReady(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [fontsLoaded]);

  // Render nothing until the app is ready
  if (!appIsReady) {
    return null;
  }

  return (
    <Providers>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="anonymous-login"
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
            animationDuration: 500,
          }}
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
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="paywall-new"
          options={{
            headerShown: false,
            gestureEnabled: false,
            presentation: 'modal',
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
          name="chat-screen"
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="medical-disclaimer"
          options={{
            gestureEnabled: false,
            headerTitle: () => null,
            animation: 'fade',
            animationDuration: 500,
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('general.medicalDisclaimer')}
                titlePosition="center"
                // onGoBack={() => router.navigate('/anonymous-login')}
                backIconColor={isDark ? colors.white : colors.blackBeauty}
              />
            ),
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
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="upload-file-flow"
          options={{
            headerTitle: () => null,
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('uploadScan.title')}
                titlePosition="center"
                onGoBack={router.back}
                backIconColor={isDark ? colors.white : colors.blackBeauty}
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
                titlePosition="center"
                rightContent={
                  <Icon
                    size={20}
                    containerStyle="bg-black dark:bg-white rounded-full p-1 mt-4 mr-6"
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
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('rootLayout.screens.termsOfService.title')}
                titlePosition="center"
                onGoBack={router.back}
                backIconColor={isDark ? colors.white : colors.black}
              />
            ),
          }}
        />
        <Stack.Screen
          name="privacy-policy"
          options={{
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('rootLayout.screens.privacyPolicy.title')}
                titlePosition="center"
                onGoBack={router.back}
                backIconColor={isDark ? colors.white : colors.black}
              />
            ),
          }}
        />

        <Stack.Screen
          name="rate"
          options={{
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('rootLayout.screens.rate.title')}
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
          name="name-preference-screen"
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
                titlePosition="center"
                onGoBack={router.back}
                backIconColor={isDark ? colors.white : colors.black}
              />
            ),
          }}
        />
        <Stack.Screen
          name="contact-us"
          options={{
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('settings.contactUs')}
                titlePosition="center"
                onGoBack={router.back}
                titleClassName="text-black"
                backIconColor={isDark ? colors.white : colors.black}
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
              <Toaster
                autoWiggleOnUpdate="toast-change"
                pauseWhenPageIsHidden
              />
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
