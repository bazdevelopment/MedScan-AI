import React from 'react';
import { View } from 'react-native';

import { generateScanReportPdf } from '@/core/utilities/generate-scan-report-pdf';
import { Text } from '@/ui';

import SharePdfActionButtons from '../share-pdf-action-buttons';
import { type IReportCard } from './report-card.interface';

const ReportCard = ({ date, title, description, score }: IReportCard) => {
  return (
    <View className="w-[300px] rounded-[30px] bg-secondary-200 p-6 dark:bg-charcoal-800">
      <Text className="text-xs text-gray-600">Date: {date.toString()}</Text>
      <Text className="my-1 font-inter text-xl">{title}</Text>
      <Text className="mt-1 text-sm ">{description}</Text>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="mt-2 text-xs">Health Score</Text>
          <Text className="text-xl font-bold">{score}</Text>
        </View>
        <SharePdfActionButtons
          heading={title}
          date={date}
          html={generateScanReportPdf({
            createdAt: new Date().toISOString(),
            interpretation: 'Your interpretation text here...',
            mimeType: 'application/pdf',
            url: 'https://example.com/doc',
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
