import { type AxiosError } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';

import {
  getTermsOfService,
  uploadTermsOfService,
} from './terms-of-service.requests';

export const useTermsOfService = createQuery<any, any, AxiosError>({
  queryKey: ['terms-of-service'],
  fetcher: getTermsOfService,
});

export const useUploadTermsOfService = createMutation<any, void, AxiosError>({
  mutationFn: uploadTermsOfService,
  onError: (error) => {
    Toast.error(error.message);
  },
});
