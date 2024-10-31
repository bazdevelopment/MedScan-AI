import axios from 'axios';

export const analyzeImageUsingAi = async (payload: FormData) => {
  try {
    const response = await axios.post(
      'https://europe-west1-x-ray-analizer-dev.cloudfunctions.net/analyzeImage',
      payload,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (err: Error) {
    throw error.message;
  }
};

export const analyzeVideoUsingAi = async (payload: FormData) => {
  try {
    const response = await axios.post(
      'https://europe-west1-x-ray-analizer-dev.cloudfunctions.net/analyzeVideo',
      payload,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data; // With axios, the response data is directly accessible as `response.data`
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message); // Catch error messages from axios
  }
};
