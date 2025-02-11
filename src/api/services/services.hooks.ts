import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import Toast from '@/components/toast';

import { addNewCollectionFields } from './services.requests';

export const useAddFieldsToCollection = createMutation<
  any,
  {
    collectionName: string;
    fields: { [key: string]: any };
  },
  AxiosError
>({
  mutationFn: (variables) => addNewCollectionFields(variables),
  onError: (error) => {
    Toast.error(error.message);
  },
});
