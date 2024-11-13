import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

import { analyzeImageUsingAi, analyzeVideoUsingAi } from './image.requests';

type Response = any;

export const useAnalyzeImage = ({ onSuccessCallback }) =>
  useMutation<Response, AxiosError, FormData>({
    mutationFn: (variables) => analyzeImageUsingAi(variables),
    onSuccess: (data) => {
      onSuccessCallback({ interpretationResult: data?.interpretationResult });
    },
    onError: () => {},
  });

export const useAnalyzeVideo = ({ onSuccessCallback }) =>
  useMutation<Response, AxiosError, FormData>({
    mutationFn: (variables) => analyzeVideoUsingAi(variables),
    onSuccess: (data) => {
      onSuccessCallback({ interpretationResult: data.interpretationResult });
    },
  });
