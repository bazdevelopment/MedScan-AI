import axios from 'axios';
import { firebaseCloudFunctionsInstance } from 'firebase/config';

/** Get user info  */
export const analyzeImageUsingAi = async ({
  userId,
  base64Image,
  imageType,
}: {
  userId: string;
  base64Image: string;
  imageType: string;
}) => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'analyzeImage',
    )({
      userId,
      base64Image,
      mediaType: imageType,
    });

    return data;
  } catch (err: Error) {
    throw err.message;
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
