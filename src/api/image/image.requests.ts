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
    console.log('Err here', err);
    throw err.message;
  }
};
