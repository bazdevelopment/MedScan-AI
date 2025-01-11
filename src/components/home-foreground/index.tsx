/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { useFetchUserNotifications } from '@/api/push-notifications/push-notifications.hooks';
import { useUser } from '@/api/user/user.hooks';
import { translate, useSelectedLanguage } from '@/core';
import { Button, colors, Text } from '@/ui';
import { BellIcon, UploadIcon } from '@/ui/assets/icons';

import Avatar from '../avatar';
import Branding from '../branding';
import CardWrapper from '../card-wrapper';
import IconBadge from '../icon-badge';
import { type INotificationItem } from '../notifications/notification-item/notification-item.interface';
import { SnakeLine, SnakeLineRotated } from '../snake-line';
import { type IHomeForeground } from './home-forground.interface';

export const Foreground = ({ scrollValue }: IHomeForeground) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { language } = useSelectedLanguage();

  const { data: userInfo } = useUser(language);
  const { data: userNotifications } = useFetchUserNotifications({
    userId: userInfo?.userId,
    language,
  })();

  const unReadMessages = userNotifications?.notifications.filter(
    (notification: INotificationItem) => !notification.isRead,
  ).length;

  const onStartUploadMediaFile = () => {
    if (userInfo?.scansRemaining <= 0) {
      return alert(translate('home.homeForeground.maxNumberOfScans'));
    }
    router.navigate('/modals-stack/upload-file-flow-modal');
  };

  const foregroundWrapperAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, 250, 330],
        [1, 0, 0],
        'clamp',
      ),
    };
  }, [scrollValue]);

  return (
    <View className="h-[320px] rounded-b-[50px] bg-primary-900 pt-[20px]">
      <SnakeLine className="absolute right-[150] top-[70]" />
      <SnakeLine className="absolute right-[50] top-[60]" />
      <SnakeLineRotated className="absolute left-[100] top-[-20]" />
      <SnakeLineRotated className="absolute left-[170] top-[-120]" />
      <SnakeLineRotated className="absolute left-[200] top-[-20]" />
      <SnakeLineRotated className=" absolute right-[-10] top-[-20]" />

      <Animated.View style={foregroundWrapperAnimatedStyle}>
        <View className="mb-2 mt-8 flex-row items-center justify-between px-8">
          <Branding />
          <TouchableOpacity onPress={() => router.navigate('/notifications')}>
            <IconBadge
              icon={<BellIcon />}
              badgeValue={unReadMessages}
              className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-white"
            />
          </TouchableOpacity>
        </View>
        <CardWrapper
          isEntirelyClickable
          className="mr-12 mt-6"
          onPress={() => router.navigate('/profile')}
        >
          <View className="ml-6 flex-row items-center">
            <Avatar
              imageUrl="https://randomuser.me/api/portraits/men/1.jpg"
              size="large"
              shape="rounded"
            />

            <View className="ml-4 gap-3">
              <View className="flex-row items-center gap-1">
                <Text className="font-semibold-nunito text-2xl text-white">{`${translate('general.welcome')}, ${userInfo?.userName}!`}</Text>
                <Text className="text-2xl">👋</Text>
              </View>
              <Text className="text-sm text-white">
                {translate('general.viewProfile')}
              </Text>
            </View>
          </View>
        </CardWrapper>

        <View className="absolute top-[200px] w-[85%] flex-col items-center self-center rounded-[40px] bg-tertiary-200 p-[20px] pb-[40px] dark:bg-charcoal-800">
          <Text className="font-bold-nunito text-xl">
            {translate('home.homeForeground.heading')}
          </Text>
          <Text className="mt-4 px-4 text-center font-medium-nunito text-base text-charcoal-600">
            {translate('home.homeForeground.subHeading')}
          </Text>
          <Button
            label={translate('uploadScan.title')}
            className="absolute top-[130px] mb-0 mt-4 h-[50] w-[55%] rounded-full border-2 border-tertiary-100 bg-primary-900 dark:border-0"
            size="lg"
            textClassName="text-md font-semibold-nunito"
            onPress={onStartUploadMediaFile}
            icon={
              <UploadIcon
                width={27}
                height={27}
                color={isDark ? colors.black : colors.white}
              />
            }
          />
        </View>
      </Animated.View>
    </View>
  );
};
