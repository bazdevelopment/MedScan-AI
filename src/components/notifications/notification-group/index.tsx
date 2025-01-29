import React from 'react';
import { View } from 'react-native';

import { Text } from '@/ui';
import HorizontalLine from '@/ui/horizontal-line';

import NotificationItem from '../notification-item';
import { type INotificationItem } from '../notification-item/notification-item.interface';

const NotificationGroup = ({
  date,
  notifications,
  onMarkNotificationAsRead,
}: {
  date: string;
  notifications: INotificationItem[];
  onMarkNotificationAsRead: ({
    notificationId,
  }: {
    notificationId: string;
  }) => void;
}) => (
  <View className="mt-6 px-6">
    <Text className="mb-2 font-semibold-nunito text-lg">{date}</Text>
    <View className="rounded-2xl">
      {notifications.map((notification: INotificationItem, index: number) => {
        const isLastRecord = index === notifications.length - 1;

        return (
          <>
            <NotificationItem
              notification={notification}
              onMarkNotificationAsRead={onMarkNotificationAsRead}
              key={notification.docId}
            />
            {!isLastRecord && notification.isRead && <HorizontalLine />}
          </>
        );
      })}
    </View>
  </View>
);
export default NotificationGroup;
