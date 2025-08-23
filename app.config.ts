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
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    appStoreUrl:
      'https://apps.apple.com/us/app/medscan-ai-imaging-analysis/id6742465790',
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    googleServicesFile: ClientEnv.GOOGLE_SERVICES_PLIST_PATH,
    entitlements: {
      'com.apple.developer.networking.wifi-info': true,
    },
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      CFBundleLocalizations: [
        'en', // English
        'zh', // Chinese
        'es', // Spanisscroh
        'hi', // Hindi
        'ar', // Arabic
        'pt', // Portuguese
        'ru', // Russian
        'ja', // Japanese
        'ko', // Korean
        'de', // German
        'fr', // French
        'ro', // Romanian
      ],
      CFBundleDevelopmentRegion: 'en', // Default language, adjust if needed
    },
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.xrayanalizer',
    googleServicesFile: ClientEnv.GOOGLE_SERVICES_JSON_PATH,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    blockedPermissions: ['FOREGROUND_SERVICE_MEDIA_PLAYBACK'], // Android review didn't pass (permission used by expo-av)You
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
      'expo-splash-screen',
      {
        backgroundColor: '#FFFFFF',
        image: './assets/icon_transparent.png',
        dark: {
          image: './assets/icon_transparent.png',
          backgroundColor: '#000000',
        },
        imageWidth: 150,
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/icon_notification_96x96.png',
        color: '#7982FD',
        defaultChannel: 'default',
      },
    ],
    [
      'expo-font',
      {
        fonts: ['./assets/fonts/Inter.ttf'],
      },
    ],
    'expo-video',
    'expo-localization',
    [
      'expo-image-picker',
      {
        photosPermission:
          'Allow $(PRODUCT_NAME) to access your photo library to upload media for AI analysis, providing insights and feedback for informational purposes.',
        cameraPermission:
          'Allow $(PRODUCT_NAME) to access your camera to capture images for AI-powered analysis, providing insights and feedback for informational purposes.',
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
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          buildToolsVersion: '35.0.0',
        },
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
