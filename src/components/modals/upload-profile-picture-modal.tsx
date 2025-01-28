/* eslint-disable max-lines-per-function */
import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable, View } from 'react-native';

import { colors, Modal, Text } from '@/ui';

interface NotificationDetailsModalProps {
  title: string;
  body: string;
}

export const UploadPictureModal = React.forwardRef<
  BottomSheetModal,
  NotificationDetailsModalProps
>(({ title, body }, ref) => {
  const height = 350; // Increased height for better content display
  const snapPoints = React.useMemo(() => [height, '70%'], [height]);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const {
    i18n: { language },
  } = useTranslation();

  const [profileImage, setProfileImage] = useState('');

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        processImage(result.assets[0].uri);
      }
    } else {
      Alert.alert('Camera access denied');
    }
  };

  const handleChooseFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        processImage(result.assets[0].uri);
      }
    } else {
      Alert.alert('Gallery access denied');
    }
  };

  const processImage = async (uri: string) => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 300, height: 300 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG },
    );
    console.log('manipulatedImage', manipulatedImage);
    setProfileImage(manipulatedImage.uri);
  };

  return (
    <Modal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: isDark ? colors.neutral[800] : colors.white,
      }}
    >
      <View className=" items-center justify-center">
        <View className="items-center justify-center ">
          <View className="w-72 items-center rounded-lg bg-white p-6">
            <Text className="mb-4 text-lg font-bold">
              Update Profile Picture
            </Text>
            <Pressable
              className="mb-3 w-full rounded-lg bg-blue-500 py-3"
              onPress={handleTakePhoto}
            >
              <Text className="text-center text-base text-white">
                Take a Photo
              </Text>
            </Pressable>
            <Pressable
              className="mb-3 w-full rounded-lg bg-blue-500 py-3"
              onPress={handleChooseFromGallery}
            >
              <Text className="text-center text-base text-white">
                Choose from Gallery
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
});
