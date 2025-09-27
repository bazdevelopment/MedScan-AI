/* eslint-disable max-lines-per-function */
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import {
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  type ViewStyle,
} from 'react-native';

import { useSelectedLanguage } from '@/core';
import { useModal } from '@/core/hooks/use-modal';
import { Image, Text } from '@/ui';
import { CloseIcon } from '@/ui/assets/icons'; // Import your arrow icons

import CustomModal from '../custom-modal';
import VideoPlayer from '../video';
import { ArrowLeftSharp } from '@/ui/assets/icons/arrow-left.sharp';
import { ArrowRightSharp } from '@/ui/assets/icons/arrow-right-sharp';

const { width: screenWidth } = Dimensions.get('window');

interface MediaItem {
  fileUri?: string;
  fileBase64?: string;
  fileMimeType?: string;
  fileName?: string;
}

interface AttachmentPreviewProps {
  // Single media props (existing)
  isVideo?: boolean;
  filePath?: string;
  fileMimeType?: string;
  className?: string;
  additionalVideoStyles?: ViewStyle;
  additionalImageStyles?: string;
  showAdditionalInfo?: boolean;
  isEntirelyClickable?: boolean;
  showDate?: boolean;

  // Multiple media props (new)
  mediaItems?: MediaItem[];
  currentIndex?: number;
  getMediaSource?: (item: MediaItem) => string;
  checkIsVideo?: (mimeType?: string) => boolean;
}

const AttachmentPreview = ({
  // Single media props
  isVideo = false,
  filePath,
  fileMimeType,
  className,
  additionalVideoStyles,
  additionalImageStyles,
  showAdditionalInfo = true,
  isEntirelyClickable = false,
  showDate = true,

  // Multiple media props
  mediaItems = [],
  currentIndex = 0,
  getMediaSource,
  checkIsVideo,
}: AttachmentPreviewProps) => {
  const { isVisible: isMediaModalVisible, openModal, closeModal } = useModal();
  const { language } = useSelectedLanguage();
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);

  // Determine if we're in multiple media mode
  const isMultipleMedia = mediaItems.length > 0;

  // Helper functions with fallbacks
  const getSource = (item: MediaItem) => {
    if (getMediaSource) {
      return getMediaSource(item);
    }
    if (item.fileBase64) {
      return `data:${item.fileMimeType};base64,${item.fileBase64}`;
    }
    return item.fileUri || '';
  };

  const isVideoMedia = (item?: MediaItem) => {
    if (checkIsVideo && item?.fileMimeType) {
      return checkIsVideo(item.fileMimeType);
    }
    return item?.fileMimeType?.toLowerCase().includes('video') || false;
  };

  // Set modal index to current index when opening
  useEffect(() => {
    if (isMediaModalVisible && isMultipleMedia) {
      setModalCurrentIndex(currentIndex);
    }
  }, [isMediaModalVisible, currentIndex, isMultipleMedia]);

  // Navigation functions
  const goToPrevious = () => {
    setModalCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : mediaItems.length - 1,
    );
  };

  const goToNext = () => {
    setModalCurrentIndex((prev) =>
      prev < mediaItems.length - 1 ? prev + 1 : 0,
    );
  };

  // Get current media for display
  const getCurrentDisplayMedia = () => {
    if (isMultipleMedia) {
      return mediaItems[currentIndex];
    }
    return { fileUri: filePath, fileMimeType };
  };

  const currentDisplayMedia = getCurrentDisplayMedia();
  const displayIsVideo = isMultipleMedia
    ? isVideoMedia(currentDisplayMedia)
    : isVideo;
  const displaySource = isMultipleMedia
    ? getSource(currentDisplayMedia)
    : filePath;

  const Container = isEntirelyClickable ? TouchableOpacity : View;

  return (
    <>
      <Container
        onPress={openModal}
        className={`rounded-[25px] border-2 border-primary-300 dark:border-primary-900 ${className} overflow-hidden`}
      >
        {displayIsVideo ? (
          <VideoPlayer
            videoSource={displaySource as string}
            onTapToView={openModal}
            additionalVideoStyles={additionalVideoStyles}
            showAdditionalInfo={showAdditionalInfo}
          />
        ) : (
          <Image
            className={`h-[120px] w-full rounded-[23px] ${additionalImageStyles}`}
            source={{
              uri: displaySource as string,
            }}
            contentFit="cover"
            onTapToView={openModal}
            showAdditionalInfo={showAdditionalInfo}
          />
        )}

        {showAdditionalInfo && (
          <View className="top-[-35px] z-[-1] mb-[-35px] flex-row justify-between rounded-[22px] border-primary-700 bg-primary-900 px-4 pb-3 pt-[45px] dark:bg-blackEerie">
            {(fileMimeType || currentDisplayMedia?.fileMimeType) && (
              <Text className="font-semibold-nunito text-sm text-white">
                {(
                  fileMimeType || currentDisplayMedia?.fileMimeType
                )?.toUpperCase()}
              </Text>
            )}
            {!!showDate && (
              <Text className="font-semibold-nunito text-sm text-white">
                {dayjs().locale(language).format('DD/MM/YYYY')}
              </Text>
            )}
            {isMultipleMedia && (
              <Text className="font-semibold-nunito text-sm text-white">
                {currentIndex + 1}/{mediaItems.length}
              </Text>
            )}
          </View>
        )}
      </Container>

      <CustomModal visible={isMediaModalVisible} onClose={closeModal}>
        <View className={`w-full ${Platform.isPad ? 'h-[85%]' : 'h-96'}`}>
          {/* Header with navigation and close button */}

          {/* Media Content */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={isMultipleMedia}
            contentOffset={
              isMultipleMedia
                ? { x: modalCurrentIndex * screenWidth, y: 0 }
                : { x: 0, y: 0 }
            }
            onMomentumScrollEnd={(event) => {
              if (isMultipleMedia) {
                const newIndex = Math.round(
                  event.nativeEvent.contentOffset.x / screenWidth,
                );
                setModalCurrentIndex(newIndex);
              }
            }}
            className="flex-1"
          >
            {isMultipleMedia ? (
              // Multiple media items
              mediaItems.map((item, index) => {
                const itemIsVideo = isVideoMedia(item);
                const itemSource = getSource(item);

                return (
                  <View
                    key={index}
                    style={{ width: screenWidth }}
                    className="flex-1 justify-center"
                  >
                    {itemIsVideo ? (
                      <View className="flex-1 justify-center px-4">
                        <VideoPlayer
                          videoSource={{ uri: itemSource }}
                          additionalVideoStyles={{
                            width: '100%',
                            height: 300,
                            borderRadius: 12,
                          }}
                        />
                      </View>
                    ) : (
                      <View
                        className={`flex-1 justify-center px-4 ${Platform.isPad ? 'h-[85%]' : 'h-96'}`}
                      >
                        <Image
                          source={{ uri: itemSource }}
                          style={{ width: screenWidth - 100 }}
                          className="h-full w-full rounded-xl"
                          contentFit="contain"
                        />
                      </View>
                    )}
                  </View>
                );
              })
            ) : (
              // Single media item
              <View
                style={{ width: screenWidth - 70 }}
                // className="w-[100%] justify-center"
              >
                {isVideo ? (
                  <View className="justify-center">
                    <VideoPlayer
                      videoSource={{ uri: filePath as string }}
                      additionalVideoStyles={{
                        width: '100%',
                        height: 300,
                        borderRadius: 12,
                      }}
                    />
                  </View>
                ) : (
                  <View
                    className={`flex-1 justify-center px-4 ${Platform.isPad ? 'h-[85%]' : 'h-96'}`}
                  >
                    <Image
                      source={{ uri: filePath as string }}
                      className="h-full w-full rounded-xl"
                      contentFit="contain"
                    />
                  </View>
                )}
              </View>
            )}
          </ScrollView>

          {/* Navigation arrows for multiple media */}
          {isMultipleMedia && mediaItems.length > 1 && (
            <>
              {/* Previous button */}
              <TouchableOpacity
                onPress={goToPrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-3"
                style={{ marginTop: -24 }}
              >
                <ArrowLeftSharp width={24} height={24} color="white" />
              </TouchableOpacity>

              {/* Next button */}
              <TouchableOpacity
                onPress={goToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-3"
                style={{ marginTop: -24 }}
              >
                <ArrowRightSharp width={24} height={24} color="white" />
              </TouchableOpacity>
            </>
          )}

          {/* Dots indicator for multiple media */}
          {isMultipleMedia && mediaItems.length > 1 && (
            <View className="absolute bottom-8 left-0 right-0 flex-row justify-center gap-2">
              {mediaItems.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setModalCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === modalCurrentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </View>
          )}
        </View>
      </CustomModal>
    </>
  );
};

export default AttachmentPreview;
