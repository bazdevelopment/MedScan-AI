import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

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
}) =>
  useMutation<Response, AxiosError, FormData>({
    mutationFn: (variables) => analyzeImageUsingAi(variables, language),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recent-interpretations'] });
      onSuccessCallback({
        interpretationResult: data.interpretationResult,
        promptMessage: data.promptMessage,
        createdDate: data.createdAt,
      });
    },
  });

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
}) =>
  useMutation<Response, AxiosError, FormData>({
    mutationFn: (variables) => analyzeVideoUsingAi(variables, language),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recent-interpretations'] });

      onSuccessCallback({
        interpretationResult: data.interpretationResult,
        promptMessage: data.promptMessage,
        createdDate: data.createdAt,
      });
    },
  });
