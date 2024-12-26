import { View } from 'react-native';

import { Text } from '@/ui';

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
  <View className="px-4">
    <Text className="mb-2 text-lg font-medium">{date}</Text>
    <View className="gap-4 rounded-2xl bg-white">
      {notifications.map((notification: INotificationItem) => {
        return (
          <NotificationItem
            notification={notification}
            onMarkNotificationAsRead={onMarkNotificationAsRead}
            key={notification.docId}
          />
        );
      })}
    </View>
  </View>
);
export default NotificationGroup;
