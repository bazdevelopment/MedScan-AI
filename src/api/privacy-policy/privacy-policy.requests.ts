import { firebaseCloudFunctionsInstance } from 'firebase/config';

export const getPrivacyPolicy = async ({ language }: { language: string }) => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'getPrivacyPolicy',
    )({ language });
    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadPrivacyPolicy = async ({
  language,
}: {
  language: string;
}) => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'uploadPrivacyPolicy',
    )({ language });
    return data;
  } catch (error) {
    throw error;
  }
};
