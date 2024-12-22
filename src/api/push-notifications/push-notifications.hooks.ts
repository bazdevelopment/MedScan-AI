import { type AxiosError } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';

import { type IGlobalNotificationsResponse } from './push-notification.interface';
import {
  getDeviceInfoByUniqueIdentifier,
  sendGlobalPushNotifications,
} from './push-notifications.requests';

type TVariables = {
  body: string;
  title: string;
};

type TUniqueIdentifierPayload = {
  deviceUniqueId: string;
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

export const useDeviceInfoByUniqueIdentifier = (
  variables: TUniqueIdentifierPayload,
) =>
  createQuery<any, TUniqueIdentifierPayload, AxiosError>({
    queryKey: ['device-info-by-unique-identifier', variables.deviceUniqueId],
    fetcher: () => getDeviceInfoByUniqueIdentifier(variables.deviceUniqueId),
  });
