/* eslint-disable max-lines-per-function */
import storage from '@react-native-firebase/storage';
import { useMutation } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { firebaseAuth } from 'firebase/config';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { generateUniqueId } from '@/core/utilities/generate-unique-id';
import { ProgressBar } from '@/ui';

interface SelectedImage {
  id: string;
  uri: string;
  url?: string;
  uploading?: boolean;
  uploadProgress?: number;
  error?: string;
}

interface AnalysisResponse {
  success: boolean;
  interpretationResult: string;
  conversationId: string;
  imageCount: number;
  message?: string;
}

const MultipleImageAnalysis = () => {
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [promptMessage, setPromptMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const userId = firebaseAuth.currentUser?.uid as string;

  // Upload single image to Firebase Storage with progress tracking
  const uploadImageToFirebase = async (
    imageUri: string,
    imageId: string,
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Update uploading state for this specific image
      setSelectedImages((prev) =>
        prev.map((img) =>
          img.id === imageId
            ? { ...img, uploading: true, uploadProgress: 0, error: undefined }
            : img,
        ),
      );

      // Generate unique ID for the file
      const uniqueId = generateUniqueId();
      const filePath = `interpretations/${userId}/${uniqueId}`;

      // Create reference to Firebase Storage
      const storageRef = storage().ref(filePath);

      // Start upload task
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

          // Update progress in state
          setSelectedImages((prev) =>
            prev.map((img) =>
              img.id === imageId ? { ...img, uploadProgress: progress } : img,
            ),
          );

          console.log(`Upload ${imageId} progress: ${progress}%`);
        },
        (error) => {
          // Handle upload error
          console.error(`Upload error for ${imageId}:`, error);

          setSelectedImages((prev) =>
            prev.map((img) =>
              img.id === imageId
                ? {
                    ...img,
                    uploading: false,
                    uploadProgress: 0,
                    error: error.message,
                  }
                : img,
            ),
          );

          reject(error);
        },
        async () => {
          // Upload completed successfully
          try {
            const downloadURL = await storageRef.getDownloadURL();
            const getInterpretationMedia = (userId: string, mediaId: string) =>
              `https://firebasestorage.googleapis.com/v0/b/x-ray-analizer-dev.firebasestorage.app/o/interpretations%2F${userId}%2F${mediaId}?alt=media`;

            // Usage:
            const url = getInterpretationMedia(userId, uniqueId);
            // Update with URL and remove uploading state
            setSelectedImages((prev) =>
              prev.map((img) =>
                img.id === imageId
                  ? {
                      ...img,
                      url: url,
                      uploading: false,
                      uploadProgress: 100,
                      error: undefined,
                    }
                  : img,
              ),
            );

            resolve(url);
          } catch (urlError) {
            console.error('Error getting download URL:', urlError);
            setSelectedImages((prev) =>
              prev.map((img) =>
                img.id === imageId
                  ? {
                      ...img,
                      uploading: false,
                      uploadProgress: 0,
                      error: 'Failed to get download URL',
                    }
                  : img,
              ),
            );
            reject(urlError);
          }
        },
      );
    });
  };

  // Upload all images to Firebase Storage
  const uploadAllImages = async (): Promise<string[]> => {
    setIsUploading(true);
    try {
      const uploadPromises = selectedImages.map(async (image) => {
        if (image.url) {
          return image.url; // Already uploaded
        }
        return await uploadImageToFirebase(image.uri, image.id);
      });

      const urls = await Promise.all(uploadPromises);
      setIsUploading(false);
      return urls;
    } catch (error) {
      setIsUploading(false);
      throw error;
    }
  };

  // Retry failed upload
  const retryUpload = async (imageId: string) => {
    const image = selectedImages.find((img) => img.id === imageId);
    if (image) {
      try {
        await uploadImageToFirebase(image.uri, imageId);
      } catch (error) {
        Alert.alert(
          'Upload Failed',
          'Failed to retry upload. Please try again.',
        );
      }
    }
  };

  // API call to analyze images
  const analyzeImagesMutation = useMutation({
    mutationFn: async (data: {
      imageUrls: string[];
      promptMessage: string;
      userId: string;
    }) => {
      const response = await fetch(
        'YOUR_CLOUD_FUNCTION_URL/analyzeMultipleImagesWithUrls',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'en', // or your preferred language
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to analyze images');
      }

      return response.json() as Promise<AnalysisResponse>;
    },
    onSuccess: (data) => {
      Alert.alert('Success', 'Images analyzed successfully!');
      // Handle success - navigate to results screen, etc.
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to analyze images. Please try again.');
      console.error('Analysis error:', error);
    },
  });

  // Pick images from gallery or camera
  const pickImages = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'Please grant camera roll permissions to select images.',
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        quality: 0.8,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets) {
        const newImages: SelectedImage[] = result.assets.map((asset) => ({
          uri: asset.uri,
        }));

        setSelectedImages((prev) => [...prev, ...newImages]);
      }
    } catch (error) {
      console.error('Error picking images:', error);
      Alert.alert('Error', 'Failed to pick images');
    }
  };

  // Remove image from selection
  const removeImage = (imageId: string) => {
    setSelectedImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  // Handle analysis
  const handleAnalyze = async () => {
    if (selectedImages.length === 0) {
      Alert.alert('No Images', 'Please select at least one image to analyze.');
      return;
    }

    try {
      // First, upload all images and get URLs
      const imageUrls = await uploadAllImages();

      // Then analyze with the URLs
      analyzeImagesMutation.mutate({
        imageUrls,
        promptMessage,
        userId: 'YOUR_USER_ID', // Replace with actual user ID from your auth
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to upload images. Please try again.');
      console.error('Upload error:', error);
    }
  };

  const allImagesUploaded = selectedImages.every((img) => img.url);
  const anyImageUploading = selectedImages.some((img) => img.uploading);
  const hasUploadErrors = selectedImages.some((img) => img.error);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Multiple Image Analysis
      </Text>

      {/* Image Selection */}
      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 16,
        }}
        onPress={pickImages}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          Select Images ({selectedImages.length})
        </Text>
      </TouchableOpacity>

      {/* Selected Images Grid */}
      {selectedImages.length > 0 && (
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
            Selected Images:
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {selectedImages.map((image) => (
              <View key={image.id} style={{ position: 'relative' }}>
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 100, height: 100, borderRadius: 8 }}
                />

                {/* Upload status overlay */}
                {(image.uploading || image.error) && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                    }}
                  >
                    {image.uploading ? (
                      <View style={{ alignItems: 'center' }}>
                        <ActivityIndicator color="white" size="small" />
                        <Text
                          style={{ color: 'white', fontSize: 10, marginTop: 4 }}
                        >
                          {image.uploadProgress || 0}%
                        </Text>
                        {image.uploadProgress !== undefined && (
                          <View style={{ marginTop: 4 }}>
                            <ProgressBar
                              initialProgress={image.uploadProgress}
                            />
                          </View>
                        )}
                      </View>
                    ) : image.error ? (
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'red', fontSize: 20 }}>⚠️</Text>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#007AFF',
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 4,
                            marginTop: 4,
                          }}
                          onPress={() => retryUpload(image.id)}
                        >
                          <Text style={{ color: 'white', fontSize: 10 }}>
                            Retry
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                )}

                {/* Success indicator */}
                {image.url && !image.uploading && !image.error && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      backgroundColor: 'green',
                      borderRadius: 10,
                      width: 20,
                      height: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 12 }}>✓</Text>
                  </View>
                )}

                {/* Remove button */}
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    backgroundColor: 'red',
                    borderRadius: 12,
                    width: 24,
                    height: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => removeImage(image.id)}
                >
                  <Text style={{ color: 'white', fontSize: 16 }}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Upload Status */}
      {hasUploadErrors && (
        <View
          style={{
            backgroundColor: '#ffebee',
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
            borderLeftWidth: 4,
            borderLeftColor: '#f44336',
          }}
        >
          <Text style={{ color: '#d32f2f', fontWeight: '600' }}>
            Some images failed to upload. Tap "Retry" on failed images.
          </Text>
        </View>
      )}

      {/* Prompt Input */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
          Additional Questions (Optional):
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            padding: 12,
            height: 100,
            textAlignVertical: 'top',
          }}
          multiline
          placeholder="Ask specific questions about the images..."
          value={promptMessage}
          onChangeText={setPromptMessage}
        />
      </View>

      {/* Upload Progress */}
      {(isUploading || anyImageUploading) && (
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={{ marginTop: 8, color: '#666' }}>
            Uploading images... (
            {selectedImages.filter((img) => img.url).length}/
            {selectedImages.length})
          </Text>
        </View>
      )}

      {/* Analyze Button */}
      <TouchableOpacity
        style={{
          backgroundColor:
            selectedImages.length === 0 ||
            isUploading ||
            anyImageUploading ||
            analyzeImagesMutation.isPending ||
            hasUploadErrors
              ? '#ccc'
              : '#28a745',
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 32,
        }}
        onPress={handleAnalyze}
        disabled={
          selectedImages.length === 0 ||
          isUploading ||
          anyImageUploading ||
          analyzeImagesMutation.isPending ||
          hasUploadErrors
        }
      >
        {analyzeImagesMutation.isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Analyze Images{' '}
            {allImagesUploaded ? `(${selectedImages.length})` : ''}
          </Text>
        )}
      </TouchableOpacity>

      {/* Analysis Result */}
      {analyzeImagesMutation.data && (
        <View
          style={{
            backgroundColor: '#f8f9fa',
            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
            Analysis Result:
          </Text>
          <Text style={{ lineHeight: 20 }}>
            {analyzeImagesMutation.data.interpretationResult}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
export default MultipleImageAnalysis;
