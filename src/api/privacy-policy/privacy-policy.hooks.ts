import { type AxiosError } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';

import {
  getPrivacyPolicy,
  uploadPrivacyPolicy,
} from './privacy-policy.requests';

export const usePrivacyPolicy = (language: string) =>
  createQuery<any, any, AxiosError>({
    queryKey: ['privacy-policy'],
    fetcher: () => getPrivacyPolicy({ language }),
  })();

export const useUploadPrivacyPolicy = createMutation<
  any,
  { language: string },
  AxiosError
>({
  mutationFn: (variables) => uploadPrivacyPolicy(variables),
  onError: (error) => {
    Toast.error(error.message);
  },
});
