import { firebaseCloudFunctionsInstance } from 'firebase/config';

export const getTermsOfService = async () => {
  try {
    const { data } =
      await firebaseCloudFunctionsInstance.httpsCallable('getTermsOfService')();
    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadTermsOfService = async () => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'uploadTermsOfService',
    )();
    return data;
  } catch (error) {
    throw error;
  }
};
