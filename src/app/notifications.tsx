import dayjs from 'dayjs';
import React from 'react';
import { ScrollView, View } from 'react-native';

import {
  useFetchUserNotifications,
  useMarkNotificationAsRead,
} from '@/api/push-notifications/push-notifications.hooks';
import { useUser } from '@/api/user/user.hooks';
import EdgeCaseTemplate from '@/components/edge-case-template';
import NotificationGroup from '@/components/notifications/notification-group';
import { type INotificationItem } from '@/components/notifications/notification-item/notification-item.interface';
import SkeletonLoader from '@/components/skeleton-loader';
import { NoNotification } from '@/ui/assets/illustrations';

export default function NotificationsScreen() {
  const { data: userInfo } = useUser();
  const { data: userNotifications, isPending: areUserNotificationsLoading } =
    useFetchUserNotifications({
      userId: userInfo?.userId,
    })();

  const { mutate: onMarkNotificationAsRead } = useMarkNotificationAsRead();

  const groupedNotifications = userNotifications?.notifications?.reduce(
    (groups: any, notification: INotificationItem) => {
      const date = dayjs(notification.createdAt);
      const formattedDate = date.isSame(dayjs(), 'day')
        ? 'Today'
        : date.isSame(dayjs().subtract(1, 'day'), 'day')
          ? 'Yesterday'
          : date.format('MMMM D, YYYY');

      if (!groups[formattedDate]) {
        groups[formattedDate] = [];
      }
      groups[formattedDate].push(notification);

      return groups;
    },
    {},
  );

  return (
    <View className="flex-1">
      <View className="flex-row items-center p-4"></View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {areUserNotificationsLoading ? (
          <SkeletonLoader />
        ) : !userNotifications?.notifications?.length ? (
          <EdgeCaseTemplate
            image={<NoNotification width={250} height={250} />}
            title="No notifications yet!"
            additionalClassName="mt-32"
          />
        ) : (
          Object.entries(groupedNotifications)?.map(
            ([date, notifications], index) => (
              <NotificationGroup
                key={index}
                date={date}
                notifications={notifications as INotificationItem[]}
                onMarkNotificationAsRead={onMarkNotificationAsRead}
              />
            ),
          )
        )}
      </ScrollView>
    </View>
  );
}
