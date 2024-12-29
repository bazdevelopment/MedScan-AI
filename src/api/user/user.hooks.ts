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
  validateVerificationCode,
} from './user.requests';

type Response = any;

interface ISendOtpCodeVariables {
  email: string;
}

interface IValidateAuthCode {
  authenticationCode: string;
  email: string;
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

export const useUser = createQuery<Response, any, AxiosError>({
  queryKey: ['user-info'],
  fetcher: getUserInfo,
});

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
  onSuccess: (data) => {
    // Toast.success(data.message);
    router.navigate('/(tabs)');
  },
  onError: (error) => {
    Toast.error(error.message || translate('alerts.validateAuthCodeError'));
  },
});

export const useDecrementScans = createMutation<Response, void, AxiosError>({
  mutationFn: decrementNumberOfScans,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['user-info'] });
  },
  onError: (error) => {
    Toast.error(error.message || translate('alerts.validateAuthCodeError'));
  },
});
