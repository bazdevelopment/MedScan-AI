import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { translate } from '@/core';
import { Text } from '@/ui';

import dayjs from '../../lib/dayjs';
import { type IReportCard } from './report-card.interface';

const ReportCard = ({ date, title, description, score }: IReportCard) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <View className="w-full rounded-[30px] bg-secondary-200 p-6 dark:bg-charcoal-800">
      <Text className="text-xs text-gray-600">
        {dayjs(date).locale(language).format('MMMM D, YYYY')}
      </Text>
      <Text className="mt-2 font-primary-nunito text-xl">
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
          <Text className="font-bold-nunito text-xl">{score || '-'}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReportCard;
