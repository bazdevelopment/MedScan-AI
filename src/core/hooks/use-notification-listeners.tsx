import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { Text } from 'react-native';

import Toast from '@/components/toast';

import { playSound } from '../utilities/play-sound';
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
        console.log('Notification Received:', notification);
        // You can update state, show a custom UI, etc.
        addSuccessHapticEffect?.();
        playSound('success');
        Toast.showCustomToast(<Text>Add here info banner</Text>); //todo create the info banner
      });

    // Listener for user interaction with notifications (foreground, background, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // Handle the user's interaction with the notification
        console.log('Notification Response:', response);
        // Navigate to a specific screen, perform actions, etc.
        //todo: add here the info banner
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
