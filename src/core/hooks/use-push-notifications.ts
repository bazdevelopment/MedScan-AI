import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Linking, Platform } from 'react-native';

import Toast from '@/components/toast';

import { translate } from '../i18n';

const usePushNotifications = () => {
  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return Toast.warning(translate('alerts.enableNotificationFailed'), {
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
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
};

export default usePushNotifications;
