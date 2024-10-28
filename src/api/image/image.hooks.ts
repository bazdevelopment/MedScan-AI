import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { showMessage } from 'react-native-flash-message';

import { analyzeImageUsingAi } from './image.requests';

interface IVariables {
  userId: string;
  base64Image: string;
  imageType: string;
}
type Response = any;

export const useAnalyzeImage = ({ onSuccessCallback }) =>
  useMutation<Response, AxiosError, IVariables>({
    mutationFn: (variables) => analyzeImageUsingAi(variables),
    onSuccess: (data) => {
      onSuccessCallback({ interpretationResult: data.interpretationResult });
    },
    onError: (error) => {
      showMessage({ message: error });
    },
  });
