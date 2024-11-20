import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import Toast from '@/components/toast';

import { type IGlobalNotificationsResponse } from './push-notification.interface';
import { sendGlobalPushNotifications } from './push-notifications.requests';

type TVariables = {
  body: string;
  title: string;
};

export const useSendGlobalPushNotifications = createMutation<
  IGlobalNotificationsResponse,
  TVariables,
  AxiosError
>({
  mutationFn: (variables) => sendGlobalPushNotifications(variables),
  onSuccess: () => {
    Toast.success('Successfully sent global push notifications!');
  },
  onError: (error) => {
    Toast.error(error.message);
  },
});
