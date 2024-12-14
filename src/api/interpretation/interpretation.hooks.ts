import { type AxiosError } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';
import { type IInterpretationRecord } from '@/types/interpretation-report';

import { queryClient } from '../common';
import {
  getInterpretationByDate,
  getInterpretationByDocumentId,
  updateInterpretationFields,
} from './interpretation.requests';
type IPayload = {
  startDate: string;
  endDate: string;
  weekNumber: number;
};

type IInterpretationById = {
  documentId: string;
};
export const useInterpretationByDate = (variables: IPayload) =>
  createQuery<IInterpretationRecord, IPayload, AxiosError>({
    queryKey: ['interpretations-by-date', variables.weekNumber],
    fetcher: () => getInterpretationByDate(variables),
  });

export const useUpdateInterpretationFields = (variables: {
  weekNumber: number;
}) =>
  createMutation<Response, any, AxiosError>({
    mutationFn: updateInterpretationFields,
    onSuccess: (data) => {
      Toast.success(data.message);
      queryClient.refetchQueries({
        queryKey: ['interpretations-by-date', variables.weekNumber],
      });
    },
    onError: (error) => {
      Toast.error(
        error.message || 'Error when updating interpretation fields!',
      );
    },
  });

export const useInterpretationById = (variables: IInterpretationById) =>
  createQuery<any, IInterpretationById, AxiosError>({
    queryKey: ['interpretations-by-id', variables.documentId],
    fetcher: () => getInterpretationByDocumentId(variables.documentId),
  });
