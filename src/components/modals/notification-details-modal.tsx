/* eslint-disable max-lines-per-function */
import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { colors, Modal, Text } from '@/ui';
import { CalendarIcon } from '@/ui/assets/icons';

import dayjs from '../../lib/dayjs';
import Icon from '../icon';

interface NotificationDetailsModalProps {
  title: string;
  body: string;
  date: string | Date;
  onShare?: () => void;
  onClose?: () => void;
}

export const NotificationDetailsModal = React.forwardRef<
  BottomSheetModal,
  NotificationDetailsModalProps
>(({ title, body, date }, ref) => {
  const height = 350; // Increased height for better content display
  const snapPoints = React.useMemo(() => [height, '70%'], [height]);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Modal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: isDark ? colors.neutral[800] : colors.white,
      }}
    >
      <View className="flex h-full flex-col">
        {/* Date */}
        <View className="ml-4 flex-row items-center gap-4 space-x-2">
          <Icon
            icon={<CalendarIcon />}
            size={25}
            color={isDark ? colors.white : colors.black}
          />
          <Text className="text-sm font-medium">
            {dayjs(date).locale(language).format('MMMM D, YYYY | h:mm A')}
          </Text>
        </View>

        {/* Title */}
        <View className="m-6 rounded-xl bg-primary-100 p-4 dark:bg-blackEerie">
          <View className="flex-row items-center gap-2">
            <Text className="font-semibold-nunito text-lg">{title}</Text>
          </View>

          {/* Body */}
          <Text
            className={`text-base ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            } mt-1`}
          >
            {body}
          </Text>
        </View>
      </View>
    </Modal>
  );
});

NotificationDetailsModal.displayName = 'NotificationDetailsModal';
