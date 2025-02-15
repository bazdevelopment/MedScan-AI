/* eslint-disable max-lines-per-function */
import * as Notifications from 'expo-notifications';
import { useCallback, useState } from 'react';
import { Linking, Platform } from 'react-native';

import { storeMobileDeviceToken } from '@/api/push-notifications/push-notifications.requests';
import Toast from '@/components/toast';

import { translate } from '../i18n';

export const usePushNotificationSetup = () => {
  const [arePushNotificationEnabled, setArePushNotificationsEnabled] =
    useState(false);

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

            Toast.warning(translate('alerts.enableNotifications.subHeading'), {
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

            return; // Exit if permissions are not granted
          }
        }

        if (existingStatus === 'granted') {
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
    [],
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

  return {
    enablePushNotifications,
    checkIfNotificationsEnabled,
    arePushNotificationEnabled,
    disablePushNotifications,
  };
};
