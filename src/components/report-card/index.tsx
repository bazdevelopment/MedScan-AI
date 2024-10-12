import { useColorScheme } from 'nativewind';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { colors, Text } from '@/ui';
import { DownloadIcon, ShareIcon } from '@/ui/icons';

import { type IReportCard } from './report-card.interface';

const ReportCard = ({ date, title, description, score }: IReportCard) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

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
        <View className="flex-row gap-3 self-end">
          <TouchableOpacity className="mr-2">
            <ShareIcon color={isDark ? colors.white : colors.darkGray} />
          </TouchableOpacity>
          <TouchableOpacity>
            <DownloadIcon color={isDark ? colors.white : colors.darkGray} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReportCard;
