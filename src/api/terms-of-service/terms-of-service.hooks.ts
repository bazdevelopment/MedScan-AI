import { type AxiosError } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';

import {
  getTermsOfService,
  uploadTermsOfService,
} from './terms-of-service.requests';

export const useTermsOfService = (language: string) =>
  createQuery<any, any, AxiosError>({
    queryKey: ['terms-of-service'],
    fetcher: () => getTermsOfService({ language }),
  })();

export const useUploadTermsOfService = createMutation<
  any,
  { language: string },
  AxiosError
>({
  mutationFn: (variables) => uploadTermsOfService(variables),
  onError: (error) => {
    Toast.error(error.message);
  },
});
