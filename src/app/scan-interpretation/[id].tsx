/* eslint-disable max-lines-per-function */
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { useInterpretationById } from '@/api/interpretation/interpretation.hooks';
import AttachmentPreview from '@/components/attachment-preview';
import Icon from '@/components/icon';
import { useSelectedLanguage } from '@/core';
import { checkIsVideo } from '@/core/utilities/check-is-video';
import { colors, Text } from '@/ui';
import { CalendarIcon, DocumentIcon } from '@/ui/assets/icons';

const ScanInterpretationDetailsScreen = () => {
  const { id: documentId } = useLocalSearchParams();
  const { language } = useSelectedLanguage();

  const { data, isPending } = useInterpretationById({
    documentId: documentId as string,
    language,
  })();

  const isVideo = checkIsVideo(data?.record?.mimeType);
  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50 dark:bg-blackEerie">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50 px-2 pt-8 dark:bg-blackEerie">
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
        <View className="mx-4 mt-6 rounded-2xl bg-primary-100 dark:bg-blackBeauty">
          <View className="flex-row items-center justify-between rounded-t-2xl bg-primary-900 p-4">
            <View className="flex-row items-center">
              <Icon
                icon={<DocumentIcon color={colors.white} />}
                size={25}
                color={colors.white}
              />
              <Text className="ml-2 font-semibold-nunito text-sm text-white">
                {data.record.mimeType.toUpperCase()}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Icon
                icon={<CalendarIcon color={colors.white} />}
                size={25}
                color={colors.transparent}
              />
              <Text className="ml-2 text-sm text-white">
                {dayjs(data.record.createdAt)
                  .locale(language)
                  .format('MMMM D, YYYY')}
              </Text>
            </View>
          </View>

          <View className="p-4">
            <Text className="mb-1 font-semibold-nunito text-base text-primary-900 dark:text-primary-600">
              Title
            </Text>
            <Text className="font-semibold-nunito text-base">
              {data?.record?.title || 'Unnamed report'}
            </Text>
          </View>
        </View>

        {/* Interpretation Section */}
        <View className="mx-4 my-6 rounded-2xl bg-primary-100 dark:bg-blackBeauty">
          <View className="rounded-t-2xl bg-primary-900 p-4">
            <Text className="font-semibold-nunito text-base text-white">
              Scan details
            </Text>
          </View>
          <View className="p-4">
            <Text className="mb-2 font-semibold-nunito text-base text-primary-900 dark:text-primary-600">
              Your input
            </Text>
            <View className="rounded-xl">
              <Text className="text-lg">
                {data.record.promptMessage || '-'}
              </Text>
            </View>
          </View>

          <View className="-mt-4 p-4">
            <Text className="mb-2 font-semibold-nunito text-base text-primary-900 dark:text-primary-600">
              Interpretation
            </Text>
            <View className="rounded-xl">
              <Text className="text-lg">
                {data.record.interpretationResult}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ScanInterpretationDetailsScreen;
