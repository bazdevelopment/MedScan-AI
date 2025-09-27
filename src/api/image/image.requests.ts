import axios from 'axios';
import {
  firebaseCloudFunctionsInstance,
  firebaseStorage as storage,
} from 'firebase/config';
import { uploadFilesToFirebase } from 'firebase/utils';
import { generateUniqueId } from 'functions/utilities/generate-unique-id';
import * as FileSystem from 'expo-file-system';

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

export const analyzeMultipleImagesUsingAI = async (payload: {
  images: string[];
  language: string;
  promptMessage: string;
  userId: string;
}) => {
  try {
    // First, upload all images and get URLs
    const imageUrls = await uploadAllImages(payload.images, payload.userId);
    const onAnalyzeMultipleImages =
      firebaseCloudFunctionsInstance.httpsCallable('analyzeMultipleImagesUrls');
    const { data } = await onAnalyzeMultipleImages({
      images: imageUrls,
      language: payload.language,
      userId: payload.userId,
      promptMessage: payload.promptMessage,
    });
    return data;
  } catch (error) {
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

const uploadImageToFirebase = async (
  imageUri: string,
  imageId: string,
  userId: string,
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    // Update uploading state for this specific image

    // Generate unique ID for the file
    const uniqueId = generateUniqueId();
    const filePath = `interpretations/${userId}/${uniqueId}`;
    // Create reference to Firebase Storage
    const storageRef = storage.ref(filePath);
    // Start upload task

    const info = await FileSystem.getInfoAsync(imageUri);
    const task = storageRef.putFile(imageUri, {
      cacheControl: 'public, max-age=31536000',
      contentType: 'image/jpeg',
      customMetadata: {
        uploadedBy: userId,
        uploadedAt: new Date().toISOString(),
        originalName: `image_${imageId}`,
        uniqueId: uniqueId,
      },
    });

    // Track upload progress
    task.on(
      'state_changed',
      (taskSnapshot) => {
        const progress = Math.round(
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
        );

        console.log(`Upload ${imageId} progress: ${progress}%`);
      },
      (error) => {
        // Handle upload error
        console.error(`Upload error for ${imageId}:`, error.message);

        reject(error);
      },
      async () => {
        // Upload completed successfully
        try {
          const downloadURL = await storageRef.getDownloadURL();
          const getInterpretationMedia = (userId: string, mediaId: string) =>
            `https://firebasestorage.googleapis.com/v0/b/x-ray-analizer-${__DEV__ ? 'dev' : 'prod'}.firebasestorage.app/o/interpretations%2F${userId}%2F${mediaId}?alt=media`;

          //!not needed for now
          const url = getInterpretationMedia(userId, uniqueId);

          resolve(downloadURL);
        } catch (urlError) {
          console.error('Error getting download URL:', urlError);

          reject(urlError);
        }
      },
    );
  });
};

// Upload all images to Firebase Storage
const uploadAllImages = async (images, userId: string): Promise<string[]> => {
  try {
    const uploadPromises = images.map(async (image) => {
      if (image.url) {
        return image.url; // Already uploaded
      }
      return await uploadImageToFirebase(image.fileUri, image.id, userId);
    });

    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    throw error;
  }
};
