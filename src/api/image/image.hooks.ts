import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

import { useCrashlytics } from '@/core/hooks/use-crashlytics';

import { queryClient } from '../common';
import { analyzeImageUsingAi, analyzeVideoUsingAi } from './image.requests';

type Response = any;

interface IAnalyzeImageParams {
  interpretationResult: string;
  promptMessage: string;
  createdDate: string;
}

export const useAnalyzeImage = ({
  onSuccessCallback,
  language,
}: {
  onSuccessCallback: ({
    interpretationResult,
    promptMessage,
    createdDate,
  }: IAnalyzeImageParams) => void;
  language: string;
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
      });
    },
    onError: (error) => {
      logEvent('Failure when analyzing medical image', 'error');
      recordError(error, 'Failure when analyzing medical image');
    },
  });
};

export const useAnalyzeVideo = ({
  onSuccessCallback,
  language,
}: {
  language: string;
  onSuccessCallback: ({
    interpretationResult,
    promptMessage,
    createdDate,
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
      });
      logEvent('Medical video has been analyzed successfully');
    },
    onError: (error) => {
      logEvent('Failure when analyzing medical vide', 'error');
      recordError(error, 'Failure when analyzing medical video');
    },
  });
};
