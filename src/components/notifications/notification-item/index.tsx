/* eslint-disable max-lines-per-function */
import dayjs from 'dayjs';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

import CardWrapper from '@/components/card-wrapper';
import { NotificationDetailsModal } from '@/components/modals/notification-details-modal';
import { useSelectedLanguage } from '@/core';
import { Button, colors, Text, useModal } from '@/ui';

import { type INotificationItem } from './notification-item.interface';

const NotificationItem = ({
  notification,
  onMarkNotificationAsRead,
}: {
  notification: INotificationItem;
  onMarkNotificationAsRead: ({
    notificationId,
    language,
  }: {
    notificationId: string;
    language: string;
  }) => void;
}) => {
  const modal = useModal();
  const { language } = useSelectedLanguage();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <CardWrapper
      key={notification.id}
      chevronColor={isDark ? colors.white : colors.black}
      isEntirelyClickable
      onPress={() => {
        modal.present();

        !notification.isRead &&
          onMarkNotificationAsRead({
            notificationId: notification.docId,
            language,
          });
      }}
      className={`flex-row items-center space-x-4 rounded-xl  ${notification.isRead ? 'bg-primary-50 dark:bg-blackBeauty' : 'mt-2 bg-primary-200 dark:bg-primary-900'}  px-4 py-6`}
    >
      <View className="flex-row items-center">
        {/* Notification Content */}
        <View className="flex-1">
          <View className="flex-row items-center">
            <View className="flex-[0.9]">
              <Text
                className="font-semibold-nunito text-lg text-gray-800"
                numberOfLines={2}
              >
                {notification.title}
              </Text>
              <Text className="font-semibold-nunito text-sm text-primary-900">
                {dayjs(notification.createdAt)
                  .locale(language)
                  .format('MMMM D, YYYY | h:mm A')}
              </Text>
            </View>

            {!notification.isRead && (
              <View className="ml-4 flex-[0.2]">
                <Button
                  label="New"
                  variant="default"
                  className="h-[24] w-[41] bg-primary-900 px-0 dark:bg-blackBeauty"
                  textClassName="text-xs dark:text-white"
                />
              </View>
            )}
          </View>

          <Text className="mt-1 text-sm text-gray-600" numberOfLines={1}>
            {notification.body}
          </Text>
        </View>
        {/* </View> */}
      </View>
      <NotificationDetailsModal
        title={notification.title}
        body={notification.body}
        date={notification.createdAt}
        ref={modal.ref}
      />
    </CardWrapper>
  );
};

export default NotificationItem;
