import { router } from 'expo-router';
import { firebaseCloudFunctionsInstance } from 'firebase/config';
import { showMessage } from 'react-native-flash-message';

import { storage } from '@/core/storage';

/** Create anonymous account */
export const createAnonymousAccount = async ({
  userName,
}: {
  userName: string;
}) => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'createAnonymousAccount',
    )({
      userName,
    });

    return data;
  } catch (err: Error) {
    console.log('createAnonymousAccount-->', err.message);
  }
};

/** Get user info  */
export const getUserInfo = async ({ userName }: { userName: string }) => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'getUserInfo',
    )({
      userName,
    });

    return data;
  } catch (err: Error) {
    console.log('getUserInfo-error', err.message);
  }
};

export const logout = () => {
  storage.delete('userId');
  router.navigate('/login');
  showMessage({ message: 'Successfully logged out', floating: true });
};
