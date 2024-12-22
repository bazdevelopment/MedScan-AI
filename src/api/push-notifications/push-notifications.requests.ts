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
    });

    return data as IStoreDeviceTokenResponse;
  } catch (error) {
    throw error;
  }
};

export const sendGlobalPushNotifications = async ({
  title,
  body,
}: {
  title: string;
  body: string;
}): Promise<IGlobalNotificationsResponse> => {
  try {
    const onSubmitGlobalNotifications =
      firebaseCloudFunctionsInstance.httpsCallable(
        'sendGlobalPushNotifications',
      );
    const { data } = await onSubmitGlobalNotifications({
      title,
      body,
    });

    return data as IGlobalNotificationsResponse;
  } catch (error) {
    throw error;
  }
};

export const getDeviceInfoByUniqueIdentifier = async (
  deviceUniqueId: string,
): Promise<any> => {
  try {
    const response = await axios.get(
      `https://europe-west1-x-ray-analizer-dev.cloudfunctions.net/getDeviceInfoByUniqueIdentifier?deviceUniqueId=${deviceUniqueId}`,
    );
    return response.data.data; // With axios, the response data is directly accessible as `response.data`
  } catch (error: any) {
    console.log('error', error);
    throw new Error(error.message); // Catch error messages from axios
  }
};
