/* eslint-disable max-lines-per-function */
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

interface IMediaPicker {
  onChooseImageFromGallery: () => void;
  onChooseFromFiles: () => void;
  onTakePhoto: () => void;
  file: string;
}

export const useMediaPiker = (): IMediaPicker => {
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, //todo: make sure in the future that you want to allow editing
        aspect: [4, 3],
        quality: 1,
      });

      // Check if the user didn't cancel the action and a URI is available
      if (result.canceled || !result.assets || !result.assets[0].uri) {
        return;
      }

      // Handle the loaded file with the URI
      handleLoadFile(result.assets[0].uri);
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
        type: 'image/*',
      });

      // Check if the user canceled the action or if the URI is missing
      if (!result.assets || !result.assets[0]?.uri) {
        return;
      }

      // Handle the loaded file with the URI
      handleLoadFile(result.assets[0].uri);
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
