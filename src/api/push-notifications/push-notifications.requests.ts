import axios from 'axios';
import { firebaseCloudFunctionsInstance } from 'firebase/config';

import {
  type IGlobalNotificationsResponse,
  type IMobileDeviceInfo,
  type IStoreDeviceTokenResponse,
} from './push-notification.interface';

export const storeMobileDeviceToken = async ({
  deviceToken,
  platform,
  version,
  deviceName,
  deviceModel,
  deviceBrand,
  deviceUniqueId,
  language,
}: IMobileDeviceInfo): Promise<IStoreDeviceTokenResponse> => {
  try {
    const handleStoreDeviceToken =
      firebaseCloudFunctionsInstance.httpsCallable('storeDeviceToken');
    const { data } = await handleStoreDeviceToken({
      deviceToken,
      platform,
      version,
      deviceName,
      deviceModel,
      deviceBrand,
      deviceUniqueId,
      language,
    });

    return data as IStoreDeviceTokenResponse;
  } catch (error) {
    throw error;
  }
};

export const sendGlobalPushNotifications = async ({
  title,
  body,
  language,
}: {
  title: string;
  body: string;
  language: string;
}): Promise<IGlobalNotificationsResponse> => {
  try {
    const onSubmitGlobalNotifications =
      firebaseCloudFunctionsInstance.httpsCallable(
        'sendGlobalPushNotifications',
      );
    const { data } = await onSubmitGlobalNotifications({
      title,
      body,
      language,
    });

    return data as IGlobalNotificationsResponse;
  } catch (error) {
    throw error;
  }
};

export const sendIndividualPushNotification = async ({
  title,
  body,
  userId,
  language,
}: {
  title: string;
  body: string;
  userId: string;
  language: string;
}): Promise<IGlobalNotificationsResponse> => {
  try {
    const onSubmitIndividualNotification =
      firebaseCloudFunctionsInstance.httpsCallable(
        'sendIndividualPushNotification',
      );
    const { data } = await onSubmitIndividualNotification({
      title,
      body,
      userId,
      language,
    });
    return data as IGlobalNotificationsResponse;
  } catch (error) {
    throw error;
  }
};

export const getDeviceInfoByUniqueIdentifier = async (
  deviceUniqueId: string,
  language: string,
): Promise<any> => {
  try {
    const response = await axios.get(
      `https://us-central1-x-ray-analizer-dev.cloudfunctions.net/getDeviceInfoByUniqueIdentifier?deviceUniqueId=${deviceUniqueId}&language=${language}`,
    );
    return response.data.data; // With axios, the response data is directly accessible as `response.data`
  } catch (error: any) {
    throw new Error(error.message); // Catch error messages from axios
  }
};

export const getUserNotifications = async (variables: {
  userId: string;
  language: string;
}): Promise<any> => {
  try {
    const onGetUserNotifications = firebaseCloudFunctionsInstance.httpsCallable(
      'fetchUserNotifications',
    );
    const { data } = await onGetUserNotifications(variables);
    return data;
  } catch (error: any) {
    throw new Error(error.message); // Catch error messages from axios
  }
};

export const markNotificationAsRead = async (variables: {
  notificationId: string;
  language: string;
}): Promise<any> => {
  try {
    const onMarkNotificationAsRead =
      firebaseCloudFunctionsInstance.httpsCallable('markNotificationAsRead');
    const { data } = await onMarkNotificationAsRead(variables);

    return data;
  } catch (error: any) {
    throw new Error(error.message); // Catch error messages from axios
  }
};
