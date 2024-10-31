/* eslint-disable max-lines-per-function */
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import { type ICollectedData } from '../flows/upload-file-flow/upload-file-flow.interface';
import { checkFileSize } from '../utilities/check-file-size';
import { getFileSizeInMB } from '../utilities/get-file-size-in-mb';
import { getImageExtension } from '../utilities/get-image-extension';

interface IMediaPicker {
  onUploadFinished: (data: ICollectedData) => void;
}

export const useMediaPiker = ({ onUploadFinished }: IMediaPicker) => {
  const [file, setFile] = useState('');

  const handleLoadFile = (file: string) => {
    setFile(file);
  };

  const handleChooseImageFromGallery = async () => {
    try {
      // Request media library permissions
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      // Check if the permission is granted
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }

      // Launch the image library picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true, //todo: make sure in the future that you want to allow editing
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      // Check if the user didn't cancel the action and a URI is available
      if (result.canceled || !result.assets || !result.assets[0].uri) {
        return;
      }

      const sizeInMb = getFileSizeInMB(result.assets[0].fileSize as number);
      const { isLimitReached } = checkFileSize(
        Number(sizeInMb),
        result.assets[0].type,
      );
      if (!isLimitReached) {
        // Handle the loaded file with the URI
        handleLoadFile(result.assets[0].uri);
        onUploadFinished &&
          onUploadFinished({
            fileMimeType: result.assets[0].mimeType,
            fileExtension: getImageExtension(
              result.assets[0].fileName as string,
            ),
            fileUri: result.assets[0].uri,
            fileName: result.assets[0].fileName,
          });
      }
    } catch (error) {
      alert(
        'Something went wrong while selecting the image. Please try again.',
      );
    }
  };
  const handleChooseFromFiles = async () => {
    try {
      // Launch the document picker for selecting an image file
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'video/*'], // Accepts only images and videos
      });

      // Check if the user canceled the action or if the URI is missing
      if (!result.assets || !result.assets[0]?.uri) {
        return;
      }
      const fileType = result.assets[0].mimeType?.startsWith('image')
        ? 'image'
        : result.assets[0].mimeType?.startsWith('video')
          ? 'video'
          : 'image';

      const sizeInMb = getFileSizeInMB(result.assets[0].size as number);
      const { isLimitReached } = checkFileSize(Number(sizeInMb), fileType);

      // Handle the loaded file with the URI
      if (!isLimitReached) {
        handleLoadFile(result.assets[0].uri);
        onUploadFinished({
          fileMimeType: result.assets[0].mimeType,
          fileExtension: getImageExtension(result.assets[0].name),
          fileUri: result.assets[0].uri,
          fileName: result.assets[0].name,
        });
      }
    } catch (error) {
      alert(
        'Something went wrong while picking the document. Please try again.',
      );
    }
  };

  const handleTakePhoto = async () => {
    try {
      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      // Log the status for debugging purposes
      console.log('Camera permission status:', status);

      // Check if the permission is granted
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }

      // Launch the camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      // Check if the user didn't cancel the action and a URI is available
      if (result.canceled || !result.assets || !result.assets[0]?.uri) {
        return;
      }

      // Handle the loaded file with the URI
      handleLoadFile(result.assets[0].uri);
      onUploadFinished && onUploadFinished({ file: result.assets[0].uri });
    } catch (error) {
      console.error('Error taking photo:', error);
      alert('Something went wrong while taking the photo. Please try again.');
    }
  };

  return {
    onChooseImageFromGallery: handleChooseImageFromGallery,
    onChooseFromFiles: handleChooseFromFiles,
    onTakePhoto: handleTakePhoto,
    file,
  };
};
