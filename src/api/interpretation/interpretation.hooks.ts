import { type AxiosError } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';
import { type IInterpretationRecord } from '@/types/interpretation-report';

import { queryClient } from '../common';
import {
  getInterpretationByDate,
  getInterpretationByDocumentId,
  getRecentReports,
  updateInterpretationFields,
} from './interpretation.requests';

type IPayload = {
  startDate: string;
  endDate: string;
  weekNumber: number;
  language: string;
};

type IInterpretationById = {
  documentId: string;
  language: string;
};
type IRecentInterpretations = {
  limit: number;
  language: string;
};
export const useInterpretationByDate = (variables: IPayload) =>
  createQuery<IInterpretationRecord, IPayload, AxiosError>({
    queryKey: ['interpretations-by-date', variables.weekNumber],
    fetcher: () => getInterpretationByDate(variables),
  });

export const useUpdateInterpretationFields = () =>
  createMutation<Response, any, AxiosError>({
    mutationFn: (variables) => updateInterpretationFields(variables),
    onSuccess: (data) => {
      Toast.success(data.message);
      queryClient.refetchQueries({
        queryKey: ['interpretations-by-date'],
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
    fetcher: () =>
      getInterpretationByDocumentId(variables.documentId, variables.language),
  });

export const useRecentInterpretations = (variables: IRecentInterpretations) =>
  createQuery<any, IRecentInterpretations, AxiosError>({
    queryKey: ['recent-interpretations'],
    fetcher: () => getRecentReports(variables.limit, variables.language),
  });
