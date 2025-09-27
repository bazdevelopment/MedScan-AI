/* eslint-disable max-lines-per-function */
import { BlurView } from '@react-native-community/blur';
import LottieView from 'lottie-react-native';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState, useRef } from 'react';
import { Image, Modal, StyleSheet, View, Animated, Easing } from 'react-native';

import { LOADING_MESSAGES_IMAGE_SCANNING } from '@/constants/loading-messages';
import { translate } from '@/core';
import useBackHandler from '@/core/hooks/use-back-handler';
import { Button, colors, Text } from '@/ui';
import { CloseIcon, RetryIcon } from '@/ui/assets/icons';

import BounceLoader from '../bounce-loader';
import VideoPlayer from '../video';
import { imageScannerModalStyles } from './image-scanner-modal.styles';

interface MediaItem {
  fileUri?: string;
  fileBase64?: string;
  fileMimeType?: string;
  fileName?: string;
}

interface IScanningModalProps {
  visible: boolean;
  onClose: () => void;
  filePath?: string;
  error: any;
  isPending: boolean;
  onRetry: () => void;
  isVideo?: boolean;

  // New props for multiple images
  isMultipleImages?: boolean;
  mediaItems?: MediaItem[];
  getMediaSource?: (item: MediaItem) => string;
  checkIsVideo?: (mimeType: string) => boolean;
}

const ScanningModal = ({
  visible,
  onClose,
  filePath,
  error,
  isPending,
  onRetry,
  isVideo = false,
  isMultipleImages = false,
  mediaItems = [],
  getMediaSource,
  checkIsVideo,
}: IScanningModalProps) => {
  useBackHandler(() => true);

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // State for image cycling
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to get media source with fallback
  const getSource = (item: MediaItem) => {
    if (getMediaSource) {
      return getMediaSource(item);
    }
    if (item.fileBase64) {
      return `data:${item.fileMimeType};base64,${item.fileBase64}`;
    }
    return item.fileUri || '';
  };

  // Helper function to check if media is video with fallback
  const isVideoMedia = (item: MediaItem) => {
    if (checkIsVideo && item.fileMimeType) {
      return checkIsVideo(item.fileMimeType);
    }
    return item.fileMimeType?.toLowerCase().includes('video') || false;
  };

  // Cycle through images when scanning multiple images
  useEffect(() => {
    if (!isPending || !isMultipleImages || mediaItems.length <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const cycleImages = () => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        // Change image
        setCurrentMediaIndex(
          (prevIndex) => (prevIndex + 1) % mediaItems.length,
        );

        // Fade back in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      });
    };

    // Start cycling every 2.5 seconds
    intervalRef.current = setInterval(cycleImages, 2500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPending, isMultipleImages, mediaItems.length, fadeAnim]);

  // Reset animation and index when modal closes or opens
  useEffect(() => {
    if (visible) {
      setCurrentMediaIndex(0);
      fadeAnim.setValue(1);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [visible, fadeAnim]);

  // Determine what to display
  const getCurrentMedia = () => {
    if (isMultipleImages && mediaItems.length > 0) {
      return mediaItems[currentMediaIndex];
    }
    return null;
  };

  const currentMedia = getCurrentMedia();
  const currentIsVideo = currentMedia ? isVideoMedia(currentMedia) : isVideo;
  const currentFilePath = currentMedia ? getSource(currentMedia) : filePath;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <BlurView
        blurAmount={10}
        style={[
          StyleSheet.absoluteFill,
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          },
        ]}
        blurType="dark"
      />
      <View className="flex-1 items-center justify-center px-10">
        <View>
          <Animated.View style={{ opacity: fadeAnim }} className="relative">
            {currentIsVideo ? (
              <View className="h-[300px] w-[300px]">
                <VideoPlayer
                  videoSource={currentFilePath as string}
                  additionalVideoStyles={{ width: 300, height: 300 }}
                />
              </View>
            ) : (
              <Image
                source={{
                  uri: currentFilePath as string,
                }}
                className="h-[300px] w-[300px] rounded-xl"
                resizeMode="cover"
              />
            )}
          </Animated.View>

          {isPending && (
            <View className="absolute inset-0 items-center justify-center">
              <LottieView
                source={require('assets/lottie/scan-animation.json')}
                autoPlay
                loop
                style={imageScannerModalStyles.lottieView}
              />
            </View>
          )}
        </View>

        {isPending && (
          <BounceLoader
            className="mt-10"
            textClassName="text-white"
            loadingMessages={LOADING_MESSAGES_IMAGE_SCANNING}
          />
        )}

        <View className="flex-column mt-10 gap-5">
          {!!error && (
            <View className="justify-center gap-5">
              <Button
                variant="default"
                label={translate('general.retry')}
                onPress={onRetry}
                className="h-12 min-w-[200] rounded-xl border-2 border-primary-900 bg-black active:opacity-80 dark:bg-black"
                textClassName="text-white dark:text-white"
                disabled={isPending}
                icon={<RetryIcon color={colors.white} width={18} height={18} />}
              />

              <Button
                label={translate('general.close')}
                onPress={onClose}
                variant="default"
                className="w-[100] justify-center self-center rounded-full bg-black active:opacity-80 dark:bg-white"
                textClassName="text-white dark:text-black"
                disabled={isPending}
                icon={
                  <CloseIcon
                    color={isDark ? colors.black : colors.white}
                    width={18}
                    height={18}
                  />
                }
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ScanningModal;
