import { type AxiosError } from 'axios';
import { router } from 'expo-router';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';
import { translate } from '@/core';
import { useCrashlytics } from '@/core/hooks/use-crashlytics';
import { wait } from '@/core/utilities/wait';
import { type IInterpretationRecord } from '@/types/interpretation-report';

import { queryClient } from '../common';
import {
  deleteReportById,
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

export const useUpdateInterpretationFields = () => {
  const { logEvent, recordError } = useCrashlytics();

  return createMutation<Response, any, AxiosError>({
    mutationFn: (variables) => updateInterpretationFields(variables),
    onSuccess: (data) => {
      Toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ['interpretations-by-date'],
      });

      logEvent('Successfully updated interpretation fields');
    },
    onError: (error) => {
      Toast.error(
        error.message || translate('alerts.interpretationFieldsUpdateFail'),
      );
      logEvent('Failure when updating interpretation fields', 'error');
      recordError(error, 'Failure when updating interpretation fields');
    },
  })();
};

export const useDeleteScanReportById = () => {
  const { logEvent, recordError } = useCrashlytics();

  return createMutation<
    { success: boolean; message: string },
    { documentId: string; language: string },
    AxiosError
  >({
    mutationFn: (variables) => deleteReportById(variables),
    onSuccess: (data) => {
      Toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ['interpretations-by-date'],
      });
      queryClient.invalidateQueries({
        queryKey: ['recent-interpretations'],
      });

      //!important for ios otherwise the Toast wont be displayed because the screens are changing fast
      wait(1500).then(() => router.back());

      logEvent('Successfully deleted scan report by documentId');
    },
    onError: (error) => {
      Toast.error(error.message || translate('alerts.deleteScanReportFail'));
      logEvent('Failure when deleting scan report by documentId', 'error');
      recordError(error, 'Failure when deleting scan report by documentId');
    },
  })();
};

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
