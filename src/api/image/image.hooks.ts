import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

import { queryClient } from '../common';
import { analyzeImageUsingAi, analyzeVideoUsingAi } from './image.requests';

type Response = any;

export const useAnalyzeImage = ({ onSuccessCallback, language }) =>
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
    onError: () => {},
  });

export const useAnalyzeVideo = ({ onSuccessCallback, language }) =>
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
