import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { translate } from '@/core';
import { generateScanReportPdf } from '@/core/utilities/generate-scan-report-pdf';
import { Text } from '@/ui';

import dayjs from '../../lib/dayjs';
import SharePdfActionButtons from '../share-pdf-action-buttons';
import { type IReportCard } from './report-card.interface';

const ReportCard = ({ date, title, description, score }: IReportCard) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <View className="w-[300px] rounded-[30px] bg-secondary-200 p-6 dark:bg-charcoal-800">
      <Text className="text-xs text-gray-600">
        {dayjs(date).locale(language).format('MMMM D, YYYY')}
      </Text>
      <Text className="mt-2 font-inter text-xl">
        {title || translate('components.ScanReportCard.unnamedReport')}
      </Text>
      <Text className="mt-1 text-sm" numberOfLines={2}>
        {description}
      </Text>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="mt-2 text-xs">
            {translate('components.ReportCard.rating')}
          </Text>
          <Text className="text-xl font-bold">{score || '-'}</Text>
        </View>
        <SharePdfActionButtons
          heading={title}
          date={date}
          html={generateScanReportPdf({
            createdAt: dayjs(date).locale(language).format('dddd-DD'),
            interpretation: 'Your interpretation text here...',
            mimeType: 'application/pdf',
            promptMessage: 'What is the reason?',
            title: 'Document Analysis',
            docId: 'DOC123',
          })}
        />
      </View>
    </View>
  );
};

export default ReportCard;
