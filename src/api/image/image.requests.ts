import axios from 'axios';
import { firebaseCloudFunctionsInstance } from 'firebase/config';
import { uploadFilesToFirebase } from 'firebase/utils';
import { generateUniqueId } from 'functions/utilities/generate-unique-id';

import { Env } from '@/core/env';

export const analyzeImageUsingAi = async (
  payload: FormData,
  language: string,
) => {
  try {
    const response = await axios.post(
      Env.EXPO_PUBLIC_ANALYZE_IMAGE_CONVERSATION_ENDPOINT as string,
      payload,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Accept-Language': language,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const analyzeImageUsingAiV2 = async (variables: {
  language: string;
  promptMessage: string;
  fileUri: string;
  userId: string;
}) => {
  try {
    const uniqueId = generateUniqueId();
    const storagePath = `interpretations/${variables.userId}/${uniqueId}`;

    const response = await uploadFilesToFirebase(
      [variables.fileUri],
      [storagePath],
    ).then(async ([storageUrl]) => {
      const onAnalyzeImageUsingAiV2 =
        firebaseCloudFunctionsInstance.httpsCallable(
          'analyzeImageConversationV2',
        );
      const { data } = await onAnalyzeImageUsingAiV2({
        image: storageUrl,
        language: variables.language,
        promptMessage: variables.promptMessage,
        storagePath,
      });
      return data;
    });

    return response;
  } catch (err: Error) {
    throw error.message;
  }
};

export const analyzeVideoUsingAi = async (
  payload: FormData,
  language: string,
) => {
  try {
    const response = await axios.post(
      Env.EXPO_PUBLIC_ANALYZE_VIDEO_CONVERSATION_ENDPOINT as string,
      payload,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Accept-Language': language,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const analyzeVideoUsingAiV2 = async (variables: {
  language: string;
  promptMessage: string;
  fileUris: string[];
  userId: string;
}) => {
  try {
    const storagePaths = variables.fileUris.map(
      () => `interpretations/${variables.userId}/${generateUniqueId()}`,
    );

    const response = await uploadFilesToFirebase(
      variables.fileUris,
      storagePaths,
    ).then(async (storageUrls: string[]) => {
      const onAnalyzeImageUsingAiV2 =
        firebaseCloudFunctionsInstance.httpsCallable(
          'analyzeVideoConversationV2',
        );
      const { data } = await onAnalyzeImageUsingAiV2({
        imageUrls: storageUrls,
        language: variables.language,
        promptMessage: variables.promptMessage,
        storagePaths,
      });
      return data;
    });

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
