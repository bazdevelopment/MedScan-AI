import dayjs from 'dayjs';
import React from 'react';
import { View, type ViewStyle } from 'react-native';

import { useSelectedLanguage } from '@/core';
import { useModal } from '@/core/hooks/use-modal';
import { Image, Text } from '@/ui';

import CustomModal from '../custom-modal';
import VideoPlayer from '../video';

const AttachmentPreview = ({
  isVideo,
  filePath,
  className,
  additionalVideoStyles,
  additionalImageStyles,
  fileMimeType,
  showAdditionalInfo = true,
}: {
  isVideo: boolean;
  filePath: string;
  fileMimeType: string;
  className?: string;
  additionalVideoStyles?: ViewStyle;
  additionalImageStyles?: string;
  showAdditionalInfo?: boolean;
}) => {
  const { isVisible: isMediaModalVisible, openModal, closeModal } = useModal();
  const { language } = useSelectedLanguage();

  return (
    <View
      className={`rounded-[25px] border-4 border-primary-300 ${className} overflow-hidden`}
    >
      {isVideo ? (
        <VideoPlayer
          videoSource={filePath}
          onTapToView={openModal}
          additionalVideoStyles={additionalVideoStyles}
          showAdditionalInfo={showAdditionalInfo}
        />
      ) : (
        <Image
          className={`h-[200px] w-full rounded-[23px] ${additionalImageStyles}`}
          source={{
            uri: filePath,
          }}
          contentFit="cover"
          onTapToView={openModal}
          showAdditionalInfo={showAdditionalInfo}
        />
      )}

      {showAdditionalInfo && (
        <View className="top-[-35px] z-[-1]  mb-[-35px] flex-row justify-between rounded-[22px] border-primary-700 bg-primary-900 px-4 pb-3 pt-[45px] dark:bg-blackEerie">
          <Text className="font-semibold-nunito text-sm text-white">
            {fileMimeType.toUpperCase()}
          </Text>
          <Text className="font-semibold-nunito text-sm text-white">
            {dayjs().locale(language).format('DD/MM/YYYY')}
          </Text>
        </View>
      )}
      <CustomModal visible={isMediaModalVisible} onClose={closeModal}>
        {isVideo ? (
          <View className="w-full">
            <VideoPlayer videoSource={{ uri: filePath }} />
          </View>
        ) : (
          <View className="h-96 w-full">
            <Image
              source={{ uri: filePath }}
              className="h-full w-full rounded-lg"
            />
          </View>
        )}
      </CustomModal>
    </View>
  );
};

export default AttachmentPreview;
