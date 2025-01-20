import { type AxiosError } from 'axios';
import { router } from 'expo-router';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';
import { translate } from '@/core';

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

export const useCreateAnonymousAccount = createMutation<
  Response,
  any,
  AxiosError
>({
  mutationFn: (variables) => createAnonymousAccount(variables),
  onSuccess: () => {
    Toast.success(translate('alerts.loggedInSuccess'));
    router.navigate('/(tabs)');
  },
  onError: (error) => {
    Toast.error(error.message || translate('alerts.anonymousSignInError'));
  },
});

export const useLoginWithEmail = (variables: { email: string }) =>
  createMutation<Response, any, AxiosError>({
    mutationFn: (variables) => loginWithEmail(variables),
    onSuccess: () => {
      router.push({
        pathname: '/verify-auth-code',
        params: { email: variables.email },
      });
    },
    onError: (error) => {
      Toast.error(error.message || translate('alerts.emailLoginError'));
    },
  });

export const useUser = (language: string) =>
  createQuery<Response, any, AxiosError>({
    queryKey: ['user-info'], // Include variables in the queryKey
    fetcher: () => getUserInfo({ language }), // Pass variables to the fetcher function
  })();

export const useSendVerificationCode = ({ email }: { email: string }) =>
  createMutation<Response, ISendOtpCodeVariables, AxiosError>({
    mutationFn: (variables) => sendOtpCodeViaEmail(variables),
    onSuccess: (data) => {
      Toast.success(data.message);
      router.push({ pathname: '/verify-auth-code', params: { email } });
    },
    onError: (error) => {
      Toast.error(
        error.message || translate('alerts.sendVerificationCodeError'),
      );
    },
  });

export const useValidateAuthCode = createMutation<
  Response,
  IValidateAuthCode,
  AxiosError
>({
  mutationFn: (variables) => validateVerificationCode(variables),
  onSuccess: () => {
    // Toast.success(data.message);
    // !invalidate query is not working here
    queryClient.setQueryData(['user-info'], (prevData: object) => ({
      ...prevData,
      isOtpVerified: true,
    }));
    router.navigate('/(tabs)');
  },
  onError: (error) => {
    Toast.error(error.message || translate('alerts.validateAuthCodeError'));
  },
});

export const useDecrementScans = createMutation<
  Response,
  { language: string },
  AxiosError
>({
  mutationFn: (variables) => decrementNumberOfScans(variables),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['user-info'] });
  },
  onError: (error) => {
    Toast.error(error.message || translate('alerts.validateAuthCodeError'));
  },
});

export const useUserPreferredLanguage = createMutation<
  Response,
  { language: string },
  AxiosError
>({
  mutationFn: (variables) => updateUserPreferredLanguage(variables),
  onSuccess: () => {},
  onError: (error) => {
    Toast.error(error.message || translate('alerts.preferredLanguageError'));
  },
});

export const useUpdateUser = createMutation<
  Response,
  { language: string; userId: string; fieldsToUpdate: object },
  AxiosError
>({
  mutationFn: (variables) => updateUserInfo(variables),
  onSuccess: () => {},
  onError: (error) => {
    Toast.error(error.message || translate('alerts.preferredLanguageError'));
  },
});
