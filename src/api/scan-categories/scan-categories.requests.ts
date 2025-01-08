import { firebaseCloudFunctionsInstance } from 'firebase/config';

export const getScanCategories = async ({ language }: { language: string }) => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'getScanCategories',
    )({ language });
    return data;
  } catch (error) {
    throw error;
  }
};
