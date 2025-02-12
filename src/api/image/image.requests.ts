import axios from 'axios';

export const analyzeImageUsingAi = async (
  payload: FormData,
  language: string,
) => {
  try {
    const response = await axios.post(
      'https://us-central1-x-ray-analizer-dev.cloudfunctions.net/analyzeImage',
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
      'https://us-central1-x-ray-analizer-dev.cloudfunctions.net/analyzeVideo',
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
