import { type AxiosError } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';

import { queryClient } from '../common';
import {
  type IGlobalNotificationsResponse,
  type IMarkNotificationAsReadResponse,
} from './push-notification.interface';
import {
  getDeviceInfoByUniqueIdentifier,
  getUserNotifications,
  markNotificationAsRead,
  sendGlobalPushNotifications,
  sendIndividualPushNotification,
} from './push-notifications.requests';

type TVariables = {
  body: string;
  title: string;
  language: string;
};
type TVariablesIndividualNotification = {
  body: string;
  title: string;
  userId: string;
  language: string;
};

type TMarkNotificationAsRead = { notificationId: string; language: string };

type TUniqueIdentifierPayload = {
  deviceUniqueId: string;
  language: string;
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

export const useSendIndividualPushNotification = createMutation<
  IGlobalNotificationsResponse,
  TVariablesIndividualNotification,
  AxiosError
>({
  mutationFn: (variables) => sendIndividualPushNotification(variables),
  onSuccess: (data) => {
    Toast.success('Successfully sent individual push notifications!');
  },
  onError: (error) => {
    Toast.error(error.message);
  },
});

export const useFetchUserNotifications = (variables: {
  userId: string;
  language: string;
}) =>
  createQuery<any, TUniqueIdentifierPayload, AxiosError>({
    queryKey: ['individual-user-notifications', variables.userId],
    fetcher: () => getUserNotifications(variables),
    enabled: !!variables.userId,
  });

export const useDeviceInfoByUniqueIdentifier = (
  variables: TUniqueIdentifierPayload,
) =>
  createQuery<any, TUniqueIdentifierPayload, AxiosError>({
    queryKey: ['device-info-by-unique-identifier', variables.deviceUniqueId],
    fetcher: () =>
      getDeviceInfoByUniqueIdentifier(
        variables.deviceUniqueId,
        variables.language,
      ),
  });

export const useMarkNotificationAsRead = createMutation<
  IMarkNotificationAsReadResponse,
  TMarkNotificationAsRead,
  AxiosError
>({
  mutationFn: (variables) => markNotificationAsRead(variables),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['individual-user-notifications'],
    });
  },
  onError: (error) => {
    Toast.error(error.message);
  },
});
