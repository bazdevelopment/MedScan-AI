/* eslint-disable max-lines-per-function */
import dayjs from 'dayjs';
import { useColorScheme } from 'nativewind';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { translate } from '@/core';
import { useModal } from '@/core/hooks/use-modal';
import { checkIsVideo } from '@/core/utilities/check-is-video';
import { colors, Image, Input, Text } from '@/ui';
import {
  CloseIcon, // Assuming CloseIcon is available in your assets
  EditIcon,
  PlayerIcon,
  TickCircle,
} from '@/ui/assets/icons'; // Added CloseIcon, ArrowLeftSharp, ArrowRightSharp

import CustomModal from '../custom-modal';
import Icon from '../icon';
import VideoPlayer from '../video';
import { type IScanReportCard } from './scan-report-card.interface';
import { ArrowLeftSharp } from '@/ui/assets/icons/arrow-left.sharp';
import { ArrowRightSharp } from '@/ui/assets/icons/arrow-right-sharp';

// --- Utility function: Check if a URL is a video based on extension (basic) ---
const checkIsVideoByUrl = (mediaUrl) => {
  if (typeof mediaUrl !== 'string') return false;
  const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.flv']; // Add more as needed
  const lowerCaseUrl = mediaUrl.toLowerCase();
  return videoExtensions.some((ext) => lowerCaseUrl.includes(ext));
};
// -----------------------------------------------------------------------------

const { width: screenWidth } = Dimensions.get('window');

const ScanReportCard = ({
  createdAt,
  interpretation,
  mimeType,
  url,
  urls,
  title,
  onEditTitle,
  docId,
  isUpdateTitlePending,
  language,
  dateFormat = 'MMMM D, YYYY',
  promptMessage,
  conversationMessages,
}: IScanReportCard) => {
  const messages =
    conversationMessages?.filter((msg) => !Array.isArray(msg.content)) || [];
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null); // Ref for ScrollView

  const { isVisible: isMediaModalVisible, openModal, closeModal } = useModal();

  const mediaUrls = urls?.length ? urls : url ? [url] : [];
  const isMultipleMedia = mediaUrls.length > 1;

  const isVideo = checkIsVideo(mimeType); // For the main thumbnail, falls back to checkIsVideoByUrl for gallery

  const handleOpenModal = () => {
    setModalCurrentIndex(0); // Always start at the first item
    openModal();
    // Ensure scroll position is reset when modal opens
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ x: 0, animated: false });
    }, 100); // Small delay to ensure modal is rendered before scrolling
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleTitleChange = (text: string) => {
    setEditableTitle(text);
  };

  const handleTitleSubmit = (docId: string) => {
    setIsEditing(false);
    if (editableTitle !== title) onEditTitle?.(editableTitle, docId);
  };

  const handleEdit = (docId: string) => {
    editableTitle !== title && onEditTitle?.(editableTitle, docId);
    setIsEditing(false);
  };

  // --- Navigation functions for arrows and dots ---
  const goToPrevious = () => {
    setModalCurrentIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : mediaUrls.length - 1;
      scrollViewRef.current?.scrollTo({
        x: newIndex * screenWidth,
        animated: true,
      });
      return newIndex;
    });
  };

  const goToNext = () => {
    setModalCurrentIndex((prevIndex) => {
      const newIndex = prevIndex < mediaUrls.length - 1 ? prevIndex + 1 : 0;
      scrollViewRef.current?.scrollTo({
        x: newIndex * screenWidth,
        animated: true,
      });
      return newIndex;
    });
  };

  const goToIndex = (index: number) => {
    setModalCurrentIndex(index);
    scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
  };
  // ------------------------------------------------

  return (
    <>
      <View className="mb flex-row justify-between">
        <Text className="font-bold-nunito text-xs text-primary-900">
          {dayjs(createdAt).locale(language).format(dateFormat).toUpperCase()}
        </Text>
      </View>
      <View className="mt-2 flex-row items-center">
        {mediaUrls.length > 0 && (
          <TouchableOpacity onPress={handleOpenModal}>
            {isVideo || checkIsVideoByUrl(mediaUrls[0]) ? (
              <Icon
                icon={<PlayerIcon />}
                containerStyle="w-[65px] h-[65px] mr-3 justify-center items-center bg-gray-200 dark:bg-charcoal-700 rounded-xl"
              />
            ) : (
              <View className="mr-3 h-[65px] w-[65px] overflow-hidden rounded-md bg-gray-100">
                <Image
                  source={{ uri: mediaUrls[0] }}
                  className="h-full w-full"
                />
              </View>
            )}
          </TouchableOpacity>
        )}

        <View className="flex-1">
          <View className="w-[180px] flex-row items-center">
            <View className="flex-row items-center">
              {isEditing ? (
                <Input
                  value={editableTitle}
                  placeholder={translate(
                    'components.ScanReportCard.reportTitlePlaceholder',
                  )}
                  onChangeText={handleTitleChange}
                  onSubmitEditing={() => handleTitleSubmit(docId)}
                  onBlur={() => handleTitleSubmit(docId)}
                  autoFocus
                  className="rounded-lg border-gray-300 px-2 py-1 text-sm dark:border-0 dark:bg-charcoal-700 dark:text-white"
                  multiline
                  containerClassName="rounded-lg dark:border-0"
                  style={{ width: 180 }}
                />
              ) : (
                <Text
                  className="mr-2 font-semibold-nunito text-lg"
                  numberOfLines={2}
                >
                  {editableTitle ||
                    translate('components.ScanReportCard.unnamedConversation')}
                </Text>
              )}
            </View>
            {isEditing && (
              <Icon
                icon={<TickCircle top={-5} />}
                size={24}
                onPress={() => handleEdit(docId)}
                disabled={isUpdateTitlePending}
                containerStyle="ml-6"
              />
            )}

            {!isEditing && (
              <Icon
                icon={<EditIcon />}
                color={isDark ? colors.white : colors.black}
                size={isEditing ? 26 : 20}
                onPress={handleEditToggle}
                disabled={isUpdateTitlePending}
              />
            )}
          </View>

          {interpretation && (
            <Text
              className="mt-1 font-medium-nunito text-sm leading-[20px] text-gray-600"
              numberOfLines={2}
            >
              {interpretation}
            </Text>
          )}
        </View>
      </View>

      <CustomModal visible={isMediaModalVisible} onClose={closeModal}>
        <View className={`w-full ${Platform.isPad ? 'h-[85%]' : 'h-96'}`}>
          {/* Header with index and close button */}

          {/* Media Content - ScrollView for Gallery */}
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
            className="flex-1"
          >
            {mediaUrls.map((mediaUrl, index) => {
              const itemIsVideo = checkIsVideoByUrl(mediaUrl);

              return (
                <View
                  key={index}
                  className="flex-1 justify-center items-center"
                >
                  {itemIsVideo ? (
                    <View className="justify-center w-full px-4">
                      <VideoPlayer
                        videoSource={{ uri: mediaUrl }}
                        additionalVideoStyles={{
                          width: '100%',
                          height: 300,
                          borderRadius: 12,
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      className={`flex-1 justify-center items-center  p-4 ${
                        Platform.isPad ? 'h-[85%]' : 'h-full'
                      }`}
                      style={{
                        width: screenWidth - 40,
                      }}
                    >
                      <Image
                        source={{ uri: mediaUrl }}
                        className="h-full w-full rounded-xl"
                        contentFit="contain"
                      />
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>

          {/* Navigation arrows for multiple media */}
          {isMultipleMedia && mediaUrls.length > 1 && (
            <>
              {/* Previous button */}
              <TouchableOpacity
                onPress={goToPrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-3 ml-2"
                style={{ marginTop: -24 }} // Adjust as needed to vertically center
              >
                <Icon
                  icon={<ArrowLeftSharp width={24} height={24} color="white" />}
                />
              </TouchableOpacity>

              {/* Next button */}
              <TouchableOpacity
                onPress={goToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-3 mr-2"
                style={{ marginTop: -24 }} // Adjust as needed to vertically center
              >
                <Icon
                  icon={
                    <ArrowRightSharp width={24} height={24} color="white" />
                  }
                />
              </TouchableOpacity>
            </>
          )}

          {/* Dots indicator for multiple media */}
          {isMultipleMedia && mediaUrls.length > 1 && (
            <View className="absolute bottom-8 left-0 right-0 flex-row justify-center gap-2">
              {mediaUrls.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => goToIndex(index)} // Use goToIndex for dot navigation
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

export default ScanReportCard;
