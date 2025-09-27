/* eslint-disable max-lines-per-function */
import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Toaster } from 'sonner-native';

import { useInterpretationById } from '@/api/interpretation/interpretation.hooks';
import AttachmentPreview from '@/components/attachment-preview';
import Icon from '@/components/icon';
import { DEVICE_TYPE, translate, useSelectedLanguage } from '@/core';
import { checkIsVideo } from '@/core/utilities/check-is-video';
import { colors, Text } from '@/ui';
import { CalendarIcon, DocumentIcon } from '@/ui/assets/icons';

import { ChatBubble } from '../chat-screen';

const ScanInterpretationDetailsScreen = () => {
  const { id: documentId } = useLocalSearchParams();
  const { language } = useSelectedLanguage();

  const { data, isPending } = useInterpretationById({
    documentId: documentId as string,
    language,
  })();

  const messages =
    data?.record?.conversationMessages.filter(
      (msg) => !Array.isArray(msg.content),
    ) || [];

  //  const { isMultipleImages, imageDataArray, currentImageData, totalImages } =
  //     useMemo(() => {
  //       // Check if collectedData is an object with multiple images (image_0, image_1, etc.)
  //       if (
  //         collectedData &&
  //         typeof collectedData === 'object' &&
  //         !collectedData.fileMimeType
  //       ) {
  //         const attachments = Object.values(collectedData).filter(Boolean);

  //         if (attachments.length > 1) {
  //           return {
  //             isMultipleImages: true,
  //             imageDataArray: attachments,
  //             currentImageData: attachments[currentImageIndex] || imageArray[0],
  //             totalImages: attachments.length,
  //           };
  //         }
  //         // Single image in object format
  //         if (attachments.length === 1) {
  //           const singleImage = attachments[0];
  //           return {
  //             isMultipleImages: false,
  //             imageDataArray: [singleImage],
  //             currentImageData: singleImage,
  //             totalImages: 1,
  //           };
  //         }
  //       }

  const isVideo = checkIsVideo(data?.record?.mimeType);
  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50 dark:bg-blackEerie">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50 px-2 pt-0 dark:bg-blackEerie">
      {DEVICE_TYPE.IOS && (
        <Toaster autoWiggleOnUpdate="toast-change" pauseWhenPageIsHidden />
      )}
      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Media Preview */}
        {data.record.url && (
          <AttachmentPreview
            showAdditionalInfo={false}
            filePath={data.record.url}
            isVideo={isVideo}
            className="mx-4"
            additionalImageStyles="h-[180px]"
            additionalVideoStyles={{
              height: 180,
              width: '100%',
              borderRadius: 20,
            }}
          />
        )}
        {/* Document Info Card */}
        <View className="mx-4 mt-6 rounded-2xl bg-primary-100 dark:bg-blackEerie">
          <View className="flex-row items-center justify-between rounded-t-2xl bg-primary-900 p-4">
            <View className="flex-row items-center">
              <Icon
                icon={<DocumentIcon color={colors.white} />}
                size={25}
                color={colors.white}
              />
              <Text className="ml-2 font-semibold-nunito text-sm text-white">
                {data?.record?.mimeType?.toUpperCase()}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Icon icon={<CalendarIcon />} size={25} color={colors.white} />
              <Text className="ml-2 text-sm text-white">
                {dayjs(data.record.createdAt)
                  .locale(language)
                  .format('MMMM D, YYYY')}
              </Text>
            </View>
          </View>

          <View className="p-4">
            <Text className="mb-1 font-semibold-nunito text-base text-primary-900 dark:text-primary-600">
              {translate(
                'rootLayout.screens.generateReportScreen.conversationName',
              )}
            </Text>
            <Text className="font-semibold-nunito text-base">
              {data?.record?.title ||
                translate('components.ScanReportCard.unnamedConversation')}
            </Text>
          </View>
        </View>

        {/* Interpretation Section */}
        <View className="mx-4 my-6 rounded-2xl bg-slate-100 dark:bg-blackBeauty">
          <View className="rounded-t-2xl bg-primary-900 p-4">
            <Text className="font-semibold-nunito text-base text-white">
              {/* Conversation with Aria */}
              {translate('general.conversationHistory')}
              {/* {translate(
                'rootLayout.screens.generateReportScreen.medicalReport',
              )} */}
            </Text>
          </View>
          {/* <View className="p-4">
            <Text className="mb-2 font-semibold-nunito text-base text-primary-900 dark:text-primary-600">
              {translate('rootLayout.screens.generateReportScreen.userInput')}
            </Text>
            <View className="rounded-xl">
              <Text className="text-lg">
                {data.record.promptMessage || '-'}
              </Text>
            </View>
          </View> */}

          {/* <Text className="mb-2 font-semibold-nunito text-base text-primary-900 dark:text-primary-600">
              {translate('rootLayout.screens.generateReportScreen.report')}
            </Text> */}
          {/* <View className="rounded-xl">
              <Text className="text-lg">
                {data.record.interpretationResult}
              </Text>
            </View> */}
          {/* Messages List */}
          {!!messages.length && (
            <FlashList
              data={messages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                return (
                  <ChatBubble message={item} isUser={item.role === 'user'} />
                );
              }}
              estimatedItemSize={100}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ScanInterpretationDetailsScreen;
