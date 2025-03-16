/* eslint-disable max-lines-per-function */
import dayjs from 'dayjs';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { translate } from '@/core';
import { useModal } from '@/core/hooks/use-modal';
import { checkIsVideo } from '@/core/utilities/check-is-video';
import { generateScanReportPdf } from '@/core/utilities/generate-scan-report-pdf';
import { colors, Image, Input, Text } from '@/ui';
import { EditIcon, PlayerIcon, TickCircle } from '@/ui/assets/icons';

import CustomModal from '../custom-modal';
import Icon from '../icon';
import SharePdfActionButtons from '../share-pdf-action-buttons';
import VideoPlayer from '../video';
import { type IScanReportCard } from './scan-report-card.interface';

const ScanReportCard = ({
  createdAt,
  interpretation,
  mimeType,
  url,
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

  const { isVisible: isMediaModalVisible, openModal, closeModal } = useModal();

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleTitleChange = (text: string) => {
    setEditableTitle(text);
  };

  const handleTitleSubmit = (docId: string) => {
    setIsEditing(false);
    if (editableTitle !== title) onEditTitle?.(editableTitle, docId); // Call the parent `onEdit` callback with the new title
  };
  const handleEdit = (docId: string) => {
    editableTitle !== title && onEditTitle?.(editableTitle, docId);
    setIsEditing(false);
  };

  const isVideo = checkIsVideo(mimeType);

  return (
    <>
      <View className="mb flex-row justify-between">
        <Text className="font-bold-nunito text-xs text-primary-900">
          {dayjs(createdAt).locale(language).format(dateFormat).toUpperCase()}
        </Text>

        <SharePdfActionButtons
          position="horizontal"
          heading={title}
          date={createdAt}
          html={generateScanReportPdf({
            createdAt: dayjs(createdAt).locale(language).format('DD/MM/YYYY'),
            messages,
            promptMessage,
            generatedAt: dayjs().locale(language).format('DD/MM/YYYY'),
          })}
        />
      </View>
      <View className="mt-2 flex-row items-center">
        {/* Image Section */}
        {url && (
          <TouchableOpacity onPress={openModal}>
            {isVideo ? (
              <Icon
                icon={<PlayerIcon />}
                onPress={openModal}
                containerStyle="w-[65px] h-[65px] mr-3 justify-center items-center bg-gray-200 dark:bg-charcoal-700 rounded-xl"
              />
            ) : (
              <View className="mr-3 h-[65px] w-[65px] overflow-hidden rounded-md bg-gray-100">
                <Image source={{ uri: url }} className="h-full w-full" />
              </View>
            )}
          </TouchableOpacity>
        )}

        {/* Content Section */}
        <View className="flex-1">
          {/* Header Row */}
          <View className="w-[180px] flex-row items-center">
            <View className="w-full flex-row items-center">
              {isEditing ? (
                <Input
                  value={editableTitle}
                  placeholder={translate(
                    'components.ScanReportCard.reportTitlePlaceholder',
                  )}
                  onChangeText={handleTitleChange}
                  onSubmitEditing={() => handleTitleSubmit(docId)}
                  onBlur={() => handleTitleSubmit(docId)} // Save the title on blur
                  autoFocus
                  className="rounded-lg  border-gray-300 px-2 py-1 text-sm dark:border-0 dark:bg-charcoal-700 dark:text-white"
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

          {/* Interpretation */}
          {interpretation && (
            <Text
              className="mt-1 font-medium-nunito text-sm leading-[20px] text-gray-600"
              numberOfLines={2}
            >
              {interpretation}
            </Text>
          )}

          {/* Footer Row */}
        </View>
      </View>
      <CustomModal visible={isMediaModalVisible} onClose={closeModal}>
        {isVideo ? (
          <VideoPlayer videoSource={{ uri: url }} />
        ) : (
          <Image
            source={{ uri: url }}
            className="h-96 w-96 self-center rounded-xl"
          />
        )}
      </CustomModal>
    </>
  );
};

export default ScanReportCard;
