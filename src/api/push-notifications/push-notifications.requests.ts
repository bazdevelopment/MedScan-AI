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
