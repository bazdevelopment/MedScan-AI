import { type AxiosError } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';

import {
  getPrivacyPolicy,
  uploadPrivacyPolicy,
} from './privacy-policy.requests';

export const usePrivacyPolicy = createQuery<any, any, AxiosError>({
  queryKey: ['privacy-policy'],
  fetcher: getPrivacyPolicy,
});

export const useUploadPrivacyPolicy = createMutation<any, void, AxiosError>({
  mutationFn: uploadPrivacyPolicy,
  onError: (error) => {
    Toast.error(error.message);
  },
});
