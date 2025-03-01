/* eslint-disable max-lines-per-function */
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import GradientText from '@/components/gradient-text';
import Icon from '@/components/icon';
import { translate } from '@/core';
import useBackHandler from '@/core/hooks/use-back-handler';
import { usePdfConverter } from '@/core/hooks/use-pdf-converter';
import { useSharePdfContent } from '@/core/hooks/use-share-content';
import { useSelectedLanguage } from '@/core/i18n';
import { generateScanReportPdf } from '@/core/utilities/generate-scan-report-pdf';
import { colors, Text } from '@/ui';
import { DownloadIcon, ShareIcon } from '@/ui/assets/icons';

const GenerateReportScreen = () => {
  const { interpretationResult, promptMessage, createdDate } =
    useLocalSearchParams();

  const { shareContent } = useSharePdfContent();
  const { convertToPdfAndDownload } = usePdfConverter();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { language } = useSelectedLanguage();

  useBackHandler(() => {
    return true; // Prevent default behavior
  });

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* display the balloons animation only on ios since android has an issue with pressing the download/share buttons */}
      {/* {DEVICE_TYPE.IOS && <Balloons />} */}
      <View className="flex-1 bg-gray-100 dark:bg-blackEerie">
        <View className="m-4 rounded-3xl bg-white p-3 dark:bg-blackEerie">
          {/* Header Section */}
          <GradientText
            className="mb-10 mt-2 text-center font-bold-nunito text-xl text-primary-900"
            colors={['#7CD0FC', '#A935F8']}
          >
            {translate('rootLayout.screens.generateReportScreen.title')}
          </GradientText>
          <View className="mb-4">
            <Text className="mb-4 font-bold-nunito text-lg text-primary-900 dark:text-primary-700">
              {translate('rootLayout.screens.generateReportScreen.userInput')}
            </Text>
            <Text className="text-lg font-semibold">
              {promptMessage || '-'}
            </Text>
          </View>

          {/* Thank You Message */}
          <Text className="my-4 font-bold-nunito text-lg text-primary-900 dark:text-primary-700">
            {translate('rootLayout.screens.generateReportScreen.report')}
          </Text>

          {/* Terms of Service */}
          <View className="mb-6 rounded-xl bg-primary-50 p-4 dark:bg-blackBeauty">
            <Text className="font-regular-nunito mb-4 text-lg leading-8">
              {interpretationResult}
            </Text>
          </View>

          {/* Date */}
          <Text className="mb-6 text-sm text-gray-500">
            {dayjs(createdDate)
              .locale(language)
              .format('dddd, MMMM D  |  hh:mm A')}
          </Text>

          {/* Action Buttons */}
          <View className="mt-4 flex-row justify-between">
            <TouchableOpacity
              onPress={() =>
                shareContent({
                  date: dayjs(createdDate)
                    .locale(language)
                    .format('dddd, MMMM D  |  hh:mm A'),
                  content: generateScanReportPdf({
                    createdAt: dayjs(createdDate)
                      .locale(language)
                      .format('dddd-DD'),
                    interpretation: interpretationResult as string,
                    promptMessage: promptMessage as string,
                    generatedAt: dayjs().locale(language).format('DD/MM/YYYY'),
                  }),
                  title: translate(
                    'rootLayout.screens.generateReportScreen.report',
                  ),
                })
              }
              className="mx-2 flex-1 flex-row items-center justify-center rounded-xl border border-gray-200 py-3"
            >
              <Icon
                icon={
                  <ShareIcon color={isDark ? colors.white : colors.black} />
                }
                size={22}
              />

              <Text className="ml-2 text-gray-600">
                {translate('general.share')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                convertToPdfAndDownload({
                  date: createdDate,
                  title: translate(
                    'rootLayout.screens.generateReportScreen.report',
                  ),
                  html: generateScanReportPdf({
                    createdAt: dayjs(createdDate)
                      .locale(language)
                      .format('dddd-DD'),
                    interpretation: interpretationResult as string,
                    promptMessage: promptMessage as string,
                    generatedAt: dayjs().locale(language).format('DD/MM/YYYY'),
                  }),
                })
              }
              className="mx-2 flex-1 flex-row items-center justify-center rounded-xl border border-gray-200 py-3"
            >
              <Icon
                icon={<DownloadIcon />}
                size={28}
                color={isDark ? colors.white : colors.black}
              />

              <Text className="ml-2 text-gray-600">
                {translate('general.download')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default GenerateReportScreen;
