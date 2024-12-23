/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { DEVICE_DIMENSIONS } from '@/constants/device-dimentions';
import { useModal } from '@/core/hooks/use-modal';
import { colors, Image, Input, Text } from '@/ui';
import { EditIcon, PlayerIcon, TickCircle } from '@/ui/assets/icons';

import CustomModal from '../custom-modal';
import Icon from '../icon';
import VideoPlayer from '../video';
import { type IScanReportCard } from './scan-report-card.interface';

const ScanReportCard = ({
  createdAt,
  interpretation,
  mimeType,
  url,
  promptMessage = 'What is the reason?',
  title,
  onEditTitle,
  docId,
  isUpdateTitlePending,
}: IScanReportCard) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);

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

  const isVideo = mimeType === 'video/quicktime';
  return (
    <>
      <View className="mb-3 overflow-hidden rounded-lg">
        <View className="flex-row">
          {/* Image Section */}
          {url && (
            <TouchableOpacity onPress={openModal}>
              {isVideo ? (
                <Icon
                  icon={<PlayerIcon />}
                  size={60}
                  color={colors.danger[400]}
                  onPress={openModal}
                />
              ) : (
                <View className="mr-3 h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                  <Image source={{ uri: url }} className="h-full w-full" />
                </View>
              )}
            </TouchableOpacity>
          )}

          {/* Content Section */}
          <View className="flex-1">
            {/* Header Row */}
            <View className="flex-row justify-between">
              <View className="mb-1 flex-row items-center justify-between">
                {isEditing ? (
                  <Input
                    value={editableTitle}
                    placeholder="Add a title"
                    onChangeText={handleTitleChange}
                    onSubmitEditing={() => handleTitleSubmit(docId)}
                    onBlur={() => handleTitleSubmit(docId)} // Save the title on blur
                    autoFocus
                    className="mr-2 flex-1 rounded border border-gray-300 px-2 py-1 text-base"
                    multiline
                    style={{ width: DEVICE_DIMENSIONS.DEVICE_WIDTH / 1.75 }}
                  />
                ) : (
                  <Text className="mr-2  text-lg" numberOfLines={2}>
                    {editableTitle || 'Unnamed Report'}
                  </Text>
                )}
              </View>
              {/* <TouchableOpacity onPress={handleEditToggle}> */}
              {isEditing && (
                <Icon
                  icon={<TickCircle />}
                  size={26}
                  onPress={() => handleEdit(docId)}
                  disabled={isUpdateTitlePending}
                />
              )}

              {isUpdateTitlePending && (
                <ActivityIndicator className="bottom-5 left-20" />
              )}

              {!isEditing && (
                <Icon
                  icon={<EditIcon />}
                  size={isEditing ? 26 : 20}
                  onPress={handleEditToggle}
                  disabled={isUpdateTitlePending}
                />
              )}

              {/* </TouchableOpacity> */}
            </View>
            {/* Prompt Message */}
            {!!promptMessage && (
              <Text
                className="mb-1 bg-gray-50 text-sm text-gray-600"
                numberOfLines={1}
              >
                {promptMessage}
              </Text>
            )}

            {/* Interpretation */}
            {interpretation && (
              <Text className="mb-1 text-sm text-gray-700" numberOfLines={2}>
                {interpretation}
              </Text>
            )}

            {/* Footer Row */}
            <View className="mt-auto flex-row items-center justify-between">
              <Text className="text-sm text-gray-500">
                {new Date(createdAt).toLocaleDateString()}
              </Text>
              <View className="rounded bg-gray-100 px-1.5 py-0.5">
                <Text className="text-sm text-gray-600">
                  {mimeType.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <CustomModal visible={isMediaModalVisible} onClose={closeModal}>
        {isVideo ? (
          <VideoPlayer videoSource={{ uri: url }} />
        ) : (
          <Image source={{ uri: url }} className="h-96 w-96" />
        )}
      </CustomModal>
    </>
  );
};

export default ScanReportCard;
