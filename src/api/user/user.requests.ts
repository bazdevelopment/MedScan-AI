import { router } from 'expo-router';
import { firebaseAuth, firebaseCloudFunctionsInstance } from 'firebase/config';

import Toast from '@/components/toast';

/** Create anonymous account */
export const createAnonymousAccount = async ({
  userName,
}: {
  userName: string;
}) => {
  try {
    const { data }: { data: any } =
      await firebaseCloudFunctionsInstance.httpsCallable(
        'createAnonymousAccount',
      )({
        userName,
      });
    const userCredentials = await firebaseAuth.signInWithCustomToken(
      data.authToken,
    );
    return userCredentials;
  } catch (error) {
    throw error;
  }
};

export const sendOtpCodeViaEmail = async ({ email }: { email: string }) => {
  try {
    const sendEmailVerificationLink =
      firebaseCloudFunctionsInstance.httpsCallable(
        'sendVerificationCodeViaEmail',
      );
    const { data } = await sendEmailVerificationLink({
      email,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const validateVerificationCode = async ({
  authenticationCode,
  email,
}: {
  authenticationCode: string;
  email: string;
}) => {
  try {
    const verifyAuthenticationCode =
      firebaseCloudFunctionsInstance.httpsCallable('verifyAuthenticationCode');
    const { data } = await verifyAuthenticationCode({
      authenticationCode,
      email,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const decrementNumberOfScans = async () => {
  try {
    const handleDecrementScans =
      firebaseCloudFunctionsInstance.httpsCallable('decrementUserScans');
    const { data } = await handleDecrementScans();

    return data;
  } catch (error) {
    throw error;
  }
};

/** Get user info  */
export const getUserInfo = async () => {
  try {
    const { data } =
      await firebaseCloudFunctionsInstance.httpsCallable('getUserInfo')();
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  // await firebaseAuth.currentUser?.delete();
  await firebaseAuth.signOut();
  router.navigate('/login');
  Toast.success('Successfully logged out!');
};
