/* eslint-disable max-lines-per-function */
import Constants from 'expo-constants';
import * as DeviceInfo from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';

import { storeMobileDeviceToken } from '@/api/push-notifications/push-notifications.requests';
import Toast from '@/components/toast';

import { Env } from '../env';
import { storage } from '../storage';
import { getUniqueDeviceIdentifier } from '../utilities/get-unique-device-identifier';
import useAppState from './use-app-state';

export const usePushNotificationSetup = () => {
  const [arePushNotificationEnabled, setArePushNotificationsEnabled] =
    useState(false);
  const [deviceToken, setDeviceToken] = useState('');

  const { appState } = useAppState();

  const enablePushNotifications = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Request permissions if not already granted
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return Alert.alert(
          'Enable Notifications',
          'Notifications are disabled. Please enable them in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
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
      }

      const projectId = Constants.expoConfig?.extra?.eas.projectId;

      if (!projectId) {
        return Toast.error('Notification project ID not found.');
      }
      const { data: token } = await Notifications.getExpoPushTokenAsync({
        projectId,
      });
      setDeviceToken(token);

      const response = await storeMobileDeviceToken({
        deviceToken: token,
        platform: Platform.OS,
        version: Env.VERSION,
        deviceName: DeviceInfo.deviceName || '',
        deviceModel: DeviceInfo.modelName || '',
        deviceBrand: DeviceInfo.brand || '',
        deviceUniqueId: getUniqueDeviceIdentifier(),
      });
      if (response.success) {
        // Update state and storage
        setArePushNotificationsEnabled(true);
        // await AsyncStorage.setItem('notificationsEnabled', 'true');
        // storage.set('notificationsEnabled', true);
      } else {
        Toast.error('Failed to enable notifications.');
      }
    } catch (error) {
      Toast.error('An error occurred while enabling notifications');
    }
  };

  const disablePushNotifications = async () => {
    try {
      const response = await storeMobileDeviceToken('');

      if (response.success) {
        // Update state and storage
        setArePushNotificationsEnabled(false);
        // storage.set('notificationsEnabled', false);
        Toast.success('Notifications disabled successfully.');
      } else {
        Toast.success('Failed to unregister device for notifications.');
      }
    } catch (error) {
      Toast.error('An error occurred while disabling notifications.');
    }
  };

  const checkIfNotificationsEnabled = async (): Promise<void> => {
    try {
      const enabled = storage.getBoolean('notificationsEnabled');
      if (enabled) {
        setArePushNotificationsEnabled(true);
        // storage.set('notificationsEnabled', true);
      } else {
        setArePushNotificationsEnabled(false);
        // storage.set('notificationsEnabled', false);
      }
    } catch (error) {
      Toast.error('Error checking notification status.');
    }
  };

  useEffect(() => {
    checkIfNotificationsEnabled();
  }, []);

  useEffect(() => {
    if (appState === 'active') enablePushNotifications();
  }, [appState]);

  return {
    enablePushNotifications,
    checkIfNotificationsEnabled,
    arePushNotificationEnabled,
    deviceToken,
    disablePushNotifications,
  };
};
