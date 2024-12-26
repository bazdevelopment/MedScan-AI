import { View } from 'react-native';

import CardWrapper from '@/components/card-wrapper';
import { NotificationDetailsModal } from '@/components/modals/notification-details-modal';
import { Text, useModal } from '@/ui';

import NotificationIcon from '../notification-icon';
import { type INotificationItem } from './notification-item.interface';

const NotificationItem = ({
  notification,
  onMarkNotificationAsRead,
}: {
  notification: INotificationItem;
  onMarkNotificationAsRead: ({
    notificationId,
  }: {
    notificationId: string;
  }) => void;
}) => {
  const modal = useModal();
  return (
    <CardWrapper
      key={notification.id}
      isEntirelyClickable
      onPress={() => {
        // router.push({
        //   pathname: '/notification-detail',
        //   params: { title: notification.title, body: notification.body },
        // });
        modal.present();

        !notification.isRead &&
          onMarkNotificationAsRead({ notificationId: notification.docId });
      }}
      className="flex-row items-center space-x-4 rounded-xl bg-slate-100 px-4 py-6"
    >
      {/* <View className="flex-row items-center space-x-4 rounded-xl bg-slate-100 px-4 py-6"> */}
      {/* Icon Container */}

      <View className="flex-row items-center">
        <View className="rounded-full bg-gray-100 ">
          <NotificationIcon isRead={notification.isRead} />
        </View>

        {/* Notification Content */}
        <View className="ml-4 flex-1">
          <Text className="text-lg font-semibold text-gray-800">
            {notification.title}
          </Text>
          <Text className="mt-1 text-sm text-gray-600">
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
