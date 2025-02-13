/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: Env.SLUG,
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  androidStatusBar: {
    barStyle: 'light-content',
    backgroundColor: '#060047',
    translucent: true,
  },
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#FFFFFF',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    googleServicesFile: ClientEnv.GOOGLE_SERVICES_PLIST_PATH,
    entitlements: {
      'com.apple.developer.networking.wifi-info': true,
    },
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    googleServicesFile: ClientEnv.GOOGLE_SERVICES_JSON_PATH,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#2E3C4B',
    },
    intentFilters: [
      {
        action: 'VIEW',
        data: [
          {
            scheme: Env.SCHEME,
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
    package: Env.PACKAGE,
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    [
      'expo-notifications',
      {
        icon: './assets/icon_transparent.png',
        color: '#523BF5',
        defaultChannel: 'default',
      },
    ],
    [
      'expo-font',
      {
        fonts: ['./assets/fonts/Inter.ttf'],
      },
    ],
    'expo-localization',
    [
      'expo-image-picker',
      {
        photosPermission: 'Allow $(PRODUCT_NAME) to access your photo',
        cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
        //'Disables the microphone permission',
        microphonePermission: false,
      },
    ],
    [
      'expo-document-picker',
      {
        iCloudContainerEnvironment: 'Production',
      },
    ],
    'expo-router',
    [
      'app-icon-badge',
      {
        enabled: Env.APP_ENV !== 'production',
        badges: [
          {
            text: Env.APP_ENV,
            type: 'banner',
            color: 'white',
          },
          {
            text: Env.VERSION.toString(),
            type: 'ribbon',
            color: 'white',
          },
        ],
      },
    ],
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    '@react-native-firebase/crashlytics',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
    [
      'expo-quick-actions',
      {
        androidIcons: {
          heart_icon: {
            foregroundImage: './assets/heart-icon-android.png',
            backgroundColor: '#FFFFFF',
          },
        },
        iosIcons: {
          heart_icon: './assets/heart-icon-ios.png',
        },
      },
    ],
    [
      'expo-asset',
      {
        assets: ['./assets/icon_transparent.png', './assets/medical_frame.png'],
      },
    ],
  ],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
