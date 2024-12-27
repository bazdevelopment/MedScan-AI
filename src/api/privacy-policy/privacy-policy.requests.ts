import { firebaseCloudFunctionsInstance } from 'firebase/config';

export const getPrivacyPolicy = async () => {
  try {
    const { data } =
      await firebaseCloudFunctionsInstance.httpsCallable('getPrivacyPolicy')();
    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadPrivacyPolicy = async () => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'uploadPrivacyPolicy',
    )();
    return data;
  } catch (error) {
    throw error;
  }
};
