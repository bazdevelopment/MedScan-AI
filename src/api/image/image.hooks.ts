import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { showMessage } from 'react-native-flash-message';

import { analyzeImageUsingAi, analyzeVideoUsingAi } from './image.requests';

interface IUseAnalyzeImageVariables {
  userId: string;
  base64Image: string;
  imageType: string;
}

type Response = any;

export const useAnalyzeImage = ({ onSuccessCallback }) =>
  useMutation<Response, AxiosError, IUseAnalyzeImageVariables>({
    mutationFn: (variables) => analyzeImageUsingAi(variables),
    onSuccess: (data) => {
      onSuccessCallback({ interpretationResult: data.interpretationResult });
    },
    onError: (error) => {
      showMessage({ message: error });
    },
  });

export const useAnalyzeVideo = ({ onSuccessCallback }) =>
  useMutation<Response, AxiosError, FormData>({
    mutationFn: (variables) => analyzeVideoUsingAi(variables),
    onSuccess: (data) => {
      onSuccessCallback({ interpretationResult: data.interpretationResult });
    },
  });
