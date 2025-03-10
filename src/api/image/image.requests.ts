import axios from 'axios';

import { Env } from '@/core/env';

export const analyzeImageUsingAi = async (
  payload: FormData,
  language: string,
) => {
  try {
    const response = await axios.post(
      Env.EXPO_PUBLIC_ANALYZE_IMAGE_CONVERSATION as string,
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
      Env.EXPO_PUBLIC_ANALYZE_VIDEO_ENDPOINT as string,
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
