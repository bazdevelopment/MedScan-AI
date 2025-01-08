import { firebaseCloudFunctionsInstance } from 'firebase/config';

export const getTermsOfService = async ({ language }: { language: string }) => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'getTermsOfService',
    )({ language });
    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadTermsOfService = async ({
  language,
}: {
  language: string;
}) => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'uploadTermsOfService',
    )({ language });
    return data;
  } catch (error) {
    throw error;
  }
};
