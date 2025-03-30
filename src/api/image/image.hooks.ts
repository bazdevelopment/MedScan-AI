/* eslint-disable max-lines-per-function */
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { router } from 'expo-router';
import { getTimeUntilMidnight } from 'functions/utilities/get-time-until-midnight';

import Toast from '@/components/toast';
import { translate } from '@/core';
import { useCrashlytics } from '@/core/hooks/use-crashlytics';
import { generateUniqueId } from '@/core/utilities/generate-unique-id';

import { queryClient } from '../common';
import { analyzeImageUsingAi, analyzeVideoUsingAi } from './image.requests';

type Response = any;

interface IAnalyzeImageParams {
  interpretationResult: string;
  promptMessage: string;
  createdDate: string;
  conversationId: string;
}

export const useAnalyzeImage = ({
  onSuccessCallback,
  language,
  handleCloseScanningModal,
  resetFlow,
}: {
  onSuccessCallback: ({
    interpretationResult,
    promptMessage,
    createdDate,
  }: IAnalyzeImageParams) => void;
  language: string;
  handleCloseScanningModal: () => void;
  resetFlow: () => void;
}) => {
  const { logEvent, recordError } = useCrashlytics();

  return useMutation<Response, AxiosError, FormData>({
    mutationFn: (variables) => analyzeImageUsingAi(variables, language),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recent-interpretations'] });
      logEvent('Medical image has been analyzed successfully');
      onSuccessCallback({
        interpretationResult: data.interpretationResult,
        promptMessage: data.promptMessage,
        createdDate: data.createdAt,
        conversationId: data.conversationId,
      });
    },
    onError: (error: any) => {
      const isLimitReachedError = error.response.data.message
        .toLowerCase()
        .includes('limit');
      if (isLimitReachedError) {
        const { hours, minutes } = getTimeUntilMidnight();
        const limitReachedMessage = translate('alerts.scanLimitReached', {
          hours,
          minutes,
        });

        logEvent(
          'Failure when analyzing medical image - scan limit reached',
          'error',
        );
        recordError(
          error,
          'Failure when analyzing medical image - scan limit reached',
        );

        return Toast.warning(limitReachedMessage, {
          closeButton: true,
          duration: Infinity,
          action: {
            label: translate('general.askAssistant'),
            onClick: () => {
              Toast.dismiss();
              handleCloseScanningModal();
              router.navigate({
                pathname: '/chat-screen',
                params: {
                  conversationId: generateUniqueId(),
                  mediaSource: '',
                  mimeType: '',
                  conversationMode: 'RANDOM_CONVERSATION',
                },
              });
              resetFlow();
            },
          },
        });
      }
      Toast.error(error.response.data.message);
      logEvent('Failure when analyzing medical image', 'error');
      recordError(error, 'Failure when analyzing medical image');
    },
  });
};

export const useAnalyzeVideo = ({
  onSuccessCallback,
  language,
  handleCloseScanningModal,
  resetFlow,
}: {
  language: string;
  handleCloseScanningModal: () => void;
  resetFlow: () => void;
  onSuccessCallback: ({
    interpretationResult,
    promptMessage,
    createdDate,
    conversationId,
  }: IAnalyzeImageParams) => void;
}) => {
  const { logEvent, recordError } = useCrashlytics();
  return useMutation<Response, AxiosError, FormData>({
    mutationFn: (variables) => analyzeVideoUsingAi(variables, language),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recent-interpretations'] });
      onSuccessCallback({
        interpretationResult: data.interpretationResult,
        promptMessage: data.promptMessage,
        createdDate: data.createdAt,
        conversationId: data.conversationId,
      });
      logEvent('Medical video has been analyzed successfully');
    },
    onError: (error) => {
      const isLimitReachedError = error?.response?.data?.message
        .toLowerCase()
        .includes('limit');
      if (isLimitReachedError) {
        const { hours, minutes } = getTimeUntilMidnight();
        const limitReachedMessage = translate('alerts.scanLimitReached', {
          hours,
          minutes,
        });

        logEvent(
          'Failure when analyzing medical image - scan limit reached',
          'error',
        );
        recordError(
          error,
          'Failure when analyzing medical image - scan limit reached',
        );

        return Toast.warning(limitReachedMessage, {
          closeButton: true,
          duration: Infinity,
          action: {
            label: translate('general.askAssistant'),
            onClick: () => {
              Toast.dismiss();
              handleCloseScanningModal();
              router.navigate({
                pathname: '/chat-screen',
                params: {
                  conversationId: generateUniqueId(),
                  mediaSource: '',
                  mimeType: '',
                  conversationMode: 'RANDOM_CONVERSATION',
                },
              });
              resetFlow();
            },
          },
        });
      }

      Toast.error(error?.response?.data?.message);
      logEvent('Failure when analyzing medical vide', 'error');
      recordError(error, 'Failure when analyzing medical video');
    },
  });
};
