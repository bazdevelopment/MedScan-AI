import { firebaseCloudFunctionsInstance } from 'firebase/config';

export const getScanCategories = async () => {
  try {
    const { data } =
      await firebaseCloudFunctionsInstance.httpsCallable('getScanCategories')();
    return data;
  } catch (error) {
    throw error;
  }
};
