import { type AxiosError } from 'axios';
import { router } from 'expo-router';
import { createMutation, createQuery } from 'react-query-kit';

import * as storage from '@/core/storage';

import { createAnonymousAccount, getUserInfo } from './user.requests';

interface IVariables {
  userName: string;
}
type Response = any;

export const useCreateAnonymousAccount = createMutation<
  Response,
  IVariables,
  AxiosError
>({
  mutationFn: (variables) => createAnonymousAccount(variables),
  onSuccess: (data) => {
    const userId = data.userId;
    storage.setItem('userId', userId);
    // queryClient.invalidateQueries(['user']);
    router.navigate('/(tabs)');
  },
  onError: (error) => {
    console.error('Error signing in anonymously:', error);
  },
});

export const useUser = createQuery<Response, IVariables, AxiosError>({
  queryKey: ['user'],
  fetcher: (variables) => getUserInfo(variables),
});
