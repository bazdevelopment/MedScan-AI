/* eslint-disable max-lines-per-function */
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Linking, Platform } from 'react-native';

import Toast from '@/components/toast';
import { VIDEO_LENGTH_SECONDS_LIMIT } from '@/constants/limits';

import { type ICollectedData } from '../flows/upload-file-flow/upload-file-flow.interface';
import { translate } from '../i18n';
import { checkFileSize } from '../utilities/check-file-size';
import { getFileSizeInMB } from '../utilities/get-file-size-in-mb';
import { getImageExtension } from '../utilities/get-image-extension';
import { getVideoDuration } from '../utilities/get-video-duration';
import { isVideoDurationLong } from '../utilities/is-video-duration-long';

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
        Toast.warning(translate('alerts.mediaPickerPermissions'), {
          duration: Infinity,
          action: {
            label: translate('general.openSettings'),
            onClick: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
            },
          },
        });

        return;
      }

      // Launch the image library picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true, //todo: make sure in the future that you want to allow editing
        // aspect: [4, 3],
        quality: 0.9, //!if you use quality=1 the image size will be bigger and the risk is to exceed the AI limit (5MB currently)
        base64: true,
      });

      // Check if the user didn't cancel the action and a URI is available
      if (result.canceled || !result.assets || !result.assets[0].uri) {
        return;
      }

      const sizeInMb = getFileSizeInMB(result.assets[0].fileSize as number);
      const isLongVideo = isVideoDurationLong(
        result.assets[0].duration as number,
      );

      const { isLimitReached } = checkFileSize(
        Number(sizeInMb),
        result.assets[0].type,
      );

      if (isLongVideo) {
        Toast.error(
          translate('alerts.videoLimitExceeds', {
            videoSecondsLimit: VIDEO_LENGTH_SECONDS_LIMIT,
          }),
          {
            closeButton: true,
            duration: Infinity,
          },
        );
      }

      if (!isLimitReached && !isLongVideo) {
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
      Toast.error(translate('alerts.errorSelectingImagePicker'), {
        closeButton: true,
        duration: Infinity,
      });
    }
  };
  const handleChooseFromFiles = async () => {
    try {
      // Launch the document picker for selecting an image file
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'video/*'], // Accepts only images and videos,
        multiple: false,
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

      if (fileType === 'video') {
        const videoDuration = await getVideoDuration(result?.assets[0].uri);
        const isLongVideo = isVideoDurationLong(videoDuration as number);
        if (videoDuration && isLongVideo) {
          return Toast.error(
            translate('alerts.videoLimitExceeds', {
              videoSecondsLimit: VIDEO_LENGTH_SECONDS_LIMIT,
            }),
            {
              closeButton: true,
              duration: Infinity,
            },
          );
        }

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
      }

      if (fileType === 'image') {
        const compressedImage = await compressImage(result?.assets[0].uri);
        const sizeInMb = getFileSizeInMB(compressedImage.fileSize as number);
        const { isLimitReached } = checkFileSize(Number(sizeInMb), fileType);

        // Handle the loaded file with the URI
        if (!isLimitReached) {
          handleLoadFile(compressedImage.uri);
          onUploadFinished({
            fileMimeType: 'image/jpeg',
            fileExtension: compressedImage.fileExtension,
            fileUri: compressedImage.uri,
            fileName: compressedImage.fileName,
          });
        }
      }
    } catch (error) {
      Toast.error(translate('alerts.errorSelectingDocumentPicker'), {
        closeButton: true,
        duration: Infinity,
      });
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
        Toast.error(translate('alerts.mediaPickerPermissions'), {
          closeButton: true,
          duration: Infinity,
          action: {
            label: translate('general.openSettings'),
            onClick: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
            },
          },
        });
        return;
      }

      // Launch the camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 0.9, //!if you use quality=1 the image size will be bigger and the risk is to exceed the AI limit (5MB currently)
        base64: true,
      });

      const sizeInMb = getFileSizeInMB(result?.assets?.[0].fileSize as number);
      // Check if the user didn't cancel the action and a URI is available
      if (result.canceled || !result.assets || !result.assets[0]?.uri) {
        return;
      }

      const { isLimitReached } = checkFileSize(
        Number(sizeInMb),
        result.assets[0].type,
      );

      // Handle the loaded file with the URI
      if (!isLimitReached) {
        handleLoadFile(result.assets[0].uri);
        onUploadFinished &&
          onUploadFinished({
            fileMimeType: result.assets[0].mimeType,
            fileUri: result.assets[0].uri,
            fileName: result.assets[0].fileName,
          } as ICollectedData);
      }
    } catch (error) {
      Toast.error(translate('alerts.errorTakingPicture'), {
        closeButton: true,
        duration: Infinity,
      });
    }
  };

  return {
    onChooseImageFromGallery: handleChooseImageFromGallery,
    onChooseFromFiles: handleChooseFromFiles,
    onTakePhoto: handleTakePhoto,
    file,
  };
};

/**
 * Compresses an image file and returns detailed information
 * @param imageUri - The URI of the image to compress
 * @param compressionQuality - Value between 0 and 1, where lower means more compression (default: 0.6)
 * @returns Promise that resolves to an object containing the compressed image details, file size, name and extension
 */
export const compressImage = async (
  imageUri: string,
  compressionQuality: number = 0.6,
): Promise<{
  uri: string;
  width: number;
  height: number;
  fileSize: number;
  fileName: string;
  fileExtension: string;
}> => {
  try {
    // Compress the image
    const compressedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [], // No transformations like resize or rotate
      {
        compress: compressionQuality, // Compression value between 0 and 1
        format: ImageManipulator.SaveFormat.JPEG,
      },
    );

    // Get the file size of the compressed image
    const fileInfo = await FileSystem.getInfoAsync(compressedImage.uri, {
      size: true,
    });

    // Extract file name and extension from URI
    const uriComponents = compressedImage.uri.split('/');
    const fullFileName = uriComponents[uriComponents.length - 1];

    // Handle file name and extension
    let fileName = fullFileName;
    let fileExtension = 'jpg'; // Default since we're using JPEG format

    if (fullFileName.includes('.')) {
      const nameParts = fullFileName.split('.');
      fileExtension = nameParts.pop() || 'jpg';
      fileName = nameParts.join('.');
    }

    return {
      uri: compressedImage.uri,
      width: compressedImage.width,
      height: compressedImage.height,
      fileSize: fileInfo.size || 0,
      fileName: fileName,
      fileExtension: fileExtension,
    };
  } catch (error) {
    console.error('Error compressing image:', error);
    throw new Error('Failed to compress image');
  }
};
