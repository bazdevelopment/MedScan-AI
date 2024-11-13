import { type AxiosError } from 'axios';
import { router } from 'expo-router';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';

import { queryClient } from '../common';
import {
  createAnonymousAccount,
  decrementNumberOfScans,
  getUserInfo,
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
    Toast.success('Successfully logged in');
    router.navigate('/(tabs)');
  },
  onError: (error) => {
    Toast.error(error.message || 'Error signing in anonymously');
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
      Toast.error(error.message || 'Error when sending verification code');
    },
  });

export const useValidateAuthCode = createMutation<
  Response,
  IValidateAuthCode,
  AxiosError
>({
  mutationFn: (variables) => validateVerificationCode(variables),
  onSuccess: (data) => {
    Toast.success(data.message);
    router.navigate('/(tabs)');
  },
  onError: (error) => {
    Toast.error(error.message || 'Error when validating auth code');
  },
});

export const useDecrementScans = createMutation<Response, void, AxiosError>({
  mutationFn: decrementNumberOfScans,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['user-info'] });
  },
  onError: (error) => {
    Toast.error(error.message || 'Error when validating auth code');
  },
});
