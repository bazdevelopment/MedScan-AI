import { View } from 'react-native';

import Icon from '@/components/icon';
import { colors } from '@/ui';
import { NotificationBell } from '@/ui/assets/icons';

import { type INotificationIcon } from './notification-icon.interface';

const NotificationIcon = ({ isRead }: INotificationIcon) => {
  const baseClasses = 'rounded-full items-center justify-center';

  return (
    <View className={baseClasses}>
      <Icon
        icon={<NotificationBell color={colors.white} isRead={isRead} />}
        size={32}
      />
    </View>
  );
};
export default NotificationIcon;
