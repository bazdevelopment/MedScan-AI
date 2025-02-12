/* eslint-disable max-lines-per-function */
import Constants from 'expo-constants';
import * as DeviceInfo from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';

import { storeMobileDeviceToken } from '@/api/push-notifications/push-notifications.requests';
import Toast from '@/components/toast';

import { Env } from '../env';
import { translate, useSelectedLanguage } from '../i18n';
import { getUniqueDeviceIdentifier } from '../utilities/get-unique-device-identifier';

export const usePushNotificationSetup = () => {
  const [arePushNotificationEnabled, setArePushNotificationsEnabled] =
    useState(false);
  const [deviceToken, setDeviceToken] = useState('');

  const { language } = useSelectedLanguage();

  const enablePushNotifications = useCallback(
    async (showAlert: boolean = false) => {
      try {
        // Check existing notification permissions
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();

        if (existingStatus !== 'granted') {
          // Request notification permissions if not already granted
          const { status } = await Notifications.requestPermissionsAsync();

          if ((status === 'undetermined' || status === 'denied') && showAlert) {
            // Notifications not enabled, show alert to guide the user
            Alert.alert(
              translate('alerts.enableNotifications.heading'),
              translate('alerts.enableNotifications.subHeading'),
              [
                { text: translate('general.cancel'), style: 'cancel' },
                {
                  text: translate('general.openSettings'),
                  onPress: () => {
                    if (Platform.OS === 'ios') {
                      Linking.openURL('app-settings:');
                    } else {
                      Linking.openSettings();
                    }
                  },
                },
              ],
              { cancelable: false },
            );
            return; // Exit if permissions are not granted
          }
        }

        // This block will always execute, regardless of permission status
        // Get the project ID for Expo push notifications
        const projectId = Constants.expoConfig?.extra?.eas.projectId;
        if (!projectId) {
          Toast.error(translate('alerts.projectIdNotFound'));
          return;
        }

        // Fetch the Expo push token
        const { data: token } = await Notifications.getExpoPushTokenAsync({
          projectId,
        });
        setDeviceToken(token);
        // Store the device token on the server
        const response = await storeMobileDeviceToken({
          deviceToken: token,
          platform: Platform.OS,
          version: Env.VERSION,
          deviceName: DeviceInfo.deviceName || '',
          deviceModel: DeviceInfo.modelName || '',
          deviceBrand: DeviceInfo.brand || '',
          deviceUniqueId: getUniqueDeviceIdentifier(),
          language,
        });

        if (response.success && existingStatus === 'granted') {
          // Update state and MMKV storage to reflect that notifications are enabled
          setArePushNotificationsEnabled(true);
          // storage.set('arePushNotificationsEnabled', 'true');
          console.log('Push notifications enabled successfully');
        } else {
          // Log failure and show a warning toast
          Toast.warning(translate('alerts.enableNotificationFailed'), {
            action: {
              label: translate('general.openSettings'),
              onClick: () => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              },
            },
          });
        }
      } catch (error) {
        Toast.error(translate('alerts.enableNotificationError'));
      }
    },
    [language],
  );

  const disablePushNotifications = async () => {
    try {
      const response = await storeMobileDeviceToken('');

      if (response.success) {
        // Update state and MMKV storage to reflect that notifications are disabled
        setArePushNotificationsEnabled(false);
        // storage.set('arePushNotificationsEnabled', 'false');
        Toast.success(translate('alerts.notificationDisabledSuccess'));
      } else {
        Toast.success(translate('alerts.notificationDisabledRegisterError'));
      }
    } catch (error) {
      Toast.success(translate('alerts.notificationDisabledError'));
    }
  };

  const checkIfNotificationsEnabled = async (): Promise<void> => {
    try {
      const { status } = await Notifications.getPermissionsAsync();

      // Check MMKV storage for the notification preference
      // const areNotificationsEnabled =
      //   storage.getString('arePushNotificationsEnabled') === 'true';
      if (status === 'granted') {
        setArePushNotificationsEnabled(true);
      } else {
        setArePushNotificationsEnabled(false);
      }
    } catch (error) {
      Toast.success(translate('alerts.checkNotificationStatusError'));
    }
  };

  useEffect(() => {
    checkIfNotificationsEnabled();
  }, []);

  return {
    enablePushNotifications,
    checkIfNotificationsEnabled,
    arePushNotificationEnabled,
    deviceToken,
    disablePushNotifications,
  };
};
