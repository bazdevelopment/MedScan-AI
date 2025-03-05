import { type AxiosError } from 'axios';
import { router } from 'expo-router';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';
import { translate } from '@/core';
import { Env } from '@/core/env';
import { useCrashlytics } from '@/core/hooks/use-crashlytics';
import { wait } from '@/core/utilities/wait';

import { queryClient } from '../common';
import {
  createAnonymousAccount,
  decrementNumberOfScans,
  getUserInfo,
  loginWithEmail,
  sendOtpCodeViaEmail,
  updateUserInfo,
  updateUserPreferredLanguage,
  validateVerificationCode,
} from './user.requests';

type Response = any;

interface ISendOtpCodeVariables {
  email: string;
  language: string;
}

interface IValidateAuthCode {
  authenticationCode: string;
  email: string;
  language: string;
}

export const useCreateAnonymousAccount = (
  onSuccessHandler: (userId: string) => void,
) =>
  createMutation<Response, { language: string; username: string }, AxiosError>({
    mutationFn: (variables) => createAnonymousAccount(variables),
    onSuccess: (data) => {
      onSuccessHandler(data.user.uid);
      Toast.success(data.message);
      //add a small delay to display the toast message
      wait(2000).then(() => router.navigate('/(tabs)'));
    },
    onError: (error) => {
      Toast.error(error.message || translate('alerts.anonymousSignInError'));
    },
  })();

export const useLoginWithEmail = (variables: { email: string }) => {
  const { setUser, logEvent, recordError } = useCrashlytics();

  return createMutation<Response, any, AxiosError>({
    mutationFn: (variables) => loginWithEmail(variables),
    onSuccess: (data) => {
      logEvent(
        'Login with email successful and user is redirected to the auth verification screen',
      );

      Toast.success(
        `${translate(`rootLayout.screens.verifyAuthCode.verificationCodeSent`)} ${variables.email}`,
      );

      // Set the user in Crashlytics (if you have a userId in the response)
      if (data.user.uid) {
        setUser(data.user.uid);
      }

      router.navigate({
        pathname:
          variables.email === Env.EXPO_PUBLIC_TEST_ACCOUNT
            ? '/(tabs)/'
            : '/verify-auth-code',
        params: { email: variables.email },
      });
    },

    onError: (error) => {
      logEvent('Login with email failed', 'error');
      recordError(error, 'Login with email failed');
      Toast.error(error.message || translate('alerts.emailLoginError'));
    },
  });
};

export const useUser = (language: string) =>
  createQuery<Response, any, AxiosError>({
    queryKey: ['user-info'], // Include variables in the queryKey
    fetcher: () => getUserInfo({ language }), // Pass variables to the fetcher function
  })();

export const useSendVerificationCode = ({ email }: { email: string }) => {
  const { logEvent, recordError } = useCrashlytics();

  return createMutation<Response, ISendOtpCodeVariables, AxiosError>({
    mutationFn: (variables) => sendOtpCodeViaEmail(variables),
    onSuccess: (data) => {
      Toast.success(data.message);
      router.navigate({ pathname: '/verify-auth-code', params: { email } });
      logEvent(
        'Verification code has been send successfully and user redirected to the verify auth screen',
      );
    },
    onError: (error) => {
      Toast.error(
        error.message || translate('alerts.sendVerificationCodeError'),
      );
      logEvent('Sending verification failed', 'error');
      recordError(error, 'Sending verification failed');
    },
  })();
};

export const useValidateAuthCode = () => {
  const { logEvent, recordError } = useCrashlytics();

  return createMutation<Response, IValidateAuthCode, AxiosError>({
    mutationFn: (variables) => validateVerificationCode(variables),
    onSuccess: () => {
      router.navigate('/(tabs)');
      logEvent(
        'Authentication code has been validated and user is redirected to home or onboarding',
      );
    },
    onError: (error) => {
      Toast.error(error.message || translate('alerts.validateAuthCodeError'));
      logEvent('Validating authentication code failed', 'error');
      recordError(error, 'Validating authentication code failed');
    },
  })();
};

export const useDecrementScans = () => {
  const { logEvent, recordError } = useCrashlytics();

  return createMutation<Response, { language: string }, AxiosError>({
    mutationFn: (variables) => decrementNumberOfScans(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-info'] });
      logEvent('The number of scans has been decremented');
    },
    onError: (error) => {
      Toast.error(error.message || translate('alerts.validateAuthCodeError'));
      logEvent('Failed to decrement the number of scans, "error');
      recordError(error, 'Failed to decrement the number of scans');
    },
  })();
};

export const useUserPreferredLanguage = () => {
  const { logEvent, recordError } = useCrashlytics();

  return createMutation<Response, { language: string }, AxiosError>({
    mutationFn: (variables) => updateUserPreferredLanguage(variables),
    onSuccess: () => {
      logEvent('Preferred language saved successfully');
    },
    onError: (error) => {
      Toast.error(error.message || translate('alerts.preferredLanguageError'));
      recordError(error, 'Error on saving the preferred user language');
    },
  })();
};

export const useUpdateUser = () => {
  const { logEvent, recordError } = useCrashlytics();

  return createMutation<
    Response,
    { language: string; userId: string; fieldsToUpdate: object },
    AxiosError
  >({
    mutationFn: (variables) => updateUserInfo(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-info'] });
      logEvent(`Successfully updated user with the new fields`, 'info');
    },
    onError: (error) => {
      Toast.error(error.message || translate('alerts.preferredLanguageError'));
      logEvent(`Error when the user is updated with new fields`, 'error');
      recordError(error, 'Error when the user is updated with new fields');
    },
  })();
};
