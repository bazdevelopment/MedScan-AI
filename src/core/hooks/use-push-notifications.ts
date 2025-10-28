import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { Linking, Platform } from 'react-native';

import Toast from '@/components/toast';

import { translate } from '../i18n';

// Track if permission has been requested at the module level
let hasRequestedPermission = false;

const usePushNotifications = () => {
  // Also track within the hook instance
  const hasRequested = useRef(false);

  const registerForPushNotificationsAsync = async () => {
    // Prevent multiple requests
    if (hasRequested.current || hasRequestedPermission) {
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      // Mark as requested before making the request
      hasRequested.current = true;
      hasRequestedPermission = true;

      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    /**!IT CAN BE ANNOYING THIS notification for enabling push notifications */
    // if (finalStatus !== 'granted') {
    //   return Toast.warning(translate('alerts.enableNotificationFailed'), {
    //     action: {
    //       label: translate('general.openSettings'),
    //       onClick: () => {
    //         if (Platform.OS === 'ios') {
    //           Linking.openURL('app-settings:');
    //         } else {
    //           Linking.openSettings();
    //         }
    //       },
    //     },
    //   });
    // }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
};

export default usePushNotifications;
