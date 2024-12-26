/* eslint-disable max-lines-per-function */
import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { View } from 'react-native';

import { colors, Modal, Text } from '@/ui';
import { CalendarIcon, NotificationBell } from '@/ui/assets/icons';
import HorizontalLine from '@/ui/horizontal-line';

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
        <View className="mb-4 ml-4 flex-row items-center gap-4 space-x-2">
          <Icon icon={<CalendarIcon isRead />} size={24} color={colors.white} />

          <Text className="text-sm font-medium">
            {dayjs(date).format('MMMM D, YYYY • h:mm A')}
          </Text>
        </View>

        {/* Divider */}
        <HorizontalLine />

        {/* Title */}
        <View className="ml-4 flex-row items-center gap-2 space-x-2">
          <Icon
            icon={<NotificationBell isRead />}
            size={24}
            color={isDark ? colors.primary[300] : colors.primary[600]}
          />
          <Text className={`my-4 text-xl  font-semibold`}>{title}</Text>
        </View>

        {/* Body */}
        <View className="ml-4">
          <Text
            className={`text-base ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            } leading-6`}
          >
            {body}
          </Text>
        </View>
      </View>
    </Modal>
  );
});

NotificationDetailsModal.displayName = 'NotificationDetailsModal';
