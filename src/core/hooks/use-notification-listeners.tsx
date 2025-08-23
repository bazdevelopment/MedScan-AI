import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';

import Toast from '@/components/toast';

import { translate } from '../i18n';
import { playSound } from '../utilities/play-sound';
import { wait } from '../utilities/wait';
import { useHaptic } from './use-haptics';

export const useNotificationListeners = () => {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const addSuccessHapticEffect = useHaptic('success');

  useEffect(() => {
    // Listener for foreground notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // Handle notification received while app is in the foreground
        // You can update state, show a custom UI, etc.
        addSuccessHapticEffect?.();
        playSound('success');
        // !add the delay otherwise toast here causes an error when the notifications is received and the app is closed
        wait(3000).then(() => {
          Toast.info(notification.request.content.title as string, {
            action: {
              label: translate('general.seeNotifications'),
              onClick: () => {
                router.navigate('/notifications');
                Toast.dismiss();
              },
            },
            duration: 20000,
          });
        });
      });

    // Listener for user interaction with notifications (foreground, background, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // Handle the user's interaction with the notification
        // Navigate to a specific screen, perform actions, etc.
        // !add the delay otherwise toast here causes an error when the notifications is received and the app is closed
        wait(3000).then(() => {
          Toast.info(response.notification.request.content.title as string, {
            action: {
              label: translate('general.seeNotifications'),
              onClick: () => {
                router.navigate('/notifications');
                Toast.dismiss();
              },
            },
            duration: 20000,
          });
        });
      });

    return () => {
      // Clean up listeners when the component unmounts
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
};
