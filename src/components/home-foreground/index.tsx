/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Toaster } from 'sonner-native';

import { useFetchUserNotifications } from '@/api/push-notifications/push-notifications.hooks';
import { useUser } from '@/api/user/user.hooks';
import {
  DEVICE_TYPE,
  translate,
  useIsFirstTime,
  useSelectedLanguage,
} from '@/core';
import { useCrashlytics } from '@/core/hooks/use-crashlytics';
import { wait } from '@/core/utilities/wait';
import { Button, colors, Text } from '@/ui';
import { BellIcon, UploadIcon } from '@/ui/assets/icons';

import Avatar from '../avatar';
import Branding from '../branding';
import CardWrapper from '../card-wrapper';
import CustomAlert from '../custom-alert';
import IconBadge from '../icon-badge';
import { type INotificationItem } from '../notifications/notification-item/notification-item.interface';
import { SnakeLine, SnakeLineRotated } from '../snake-line';
import Toast from '../toast';
import { type IHomeForeground } from './home-forground.interface';

export const Foreground = ({ scrollValue }: IHomeForeground) => {
  const { colorScheme } = useColorScheme();
  const [isFirstTime, setIsFirstTime] = useIsFirstTime();

  const isDark = colorScheme === 'dark';
  const { language } = useSelectedLanguage();

  const { data: userInfo } = useUser(language);

  const { data: userNotifications } = useFetchUserNotifications({
    userId: userInfo?.userId,
    language,
  })();
  const { logEvent } = useCrashlytics();

  const unReadMessages = userNotifications?.notifications.filter(
    (notification: INotificationItem) => !notification.isRead,
  ).length;

  const onStartUploadMediaFile = () => {
    /**
     * isFirstTime is used to check if the user installs the app for the first time
     * usually this variable is set to false after first onboarding, but if the first onboarding is not shown again after reinstallation, the thi variable will remain to true
     * thats why we need to set it to false based on an action instead of creating another useEffect in layout
     *  */
    isFirstTime && setIsFirstTime(false);
    if (userInfo?.scansRemaining <= 0 && userInfo.isFreeTrialOngoing) {
      logEvent(
        `Alert informing user - ${userInfo.userId} that there are no scans available is displayed`,
      );
      return Toast.showCustomToast(
        <CustomAlert
          title={translate('general.attention')}
          subtitle={translate('home.homeForeground.maxNumberOfScans')}
          buttons={[
            {
              label: translate('components.UpgradeBanner.heading'),
              variant: 'default',
              onPress: () => wait(500).then(() => router.navigate('/paywall')), // a small delay in mandatory for Toast, not sure why
              buttonTextClassName: 'dark:text-white',
              className:
                'flex-1 rounded-xl h-[48] bg-primary-900 active:opacity-80 dark:bg-primary-900',
            },
          ]}
        />,
        {
          position: 'middle', // Place the alert in the middle of the screen
          duration: Infinity, // Keep the alert visible until dismissed
        },
      );
    }

    router.navigate('/upload-file-flow');
    logEvent(
      `User - ${userInfo.userId} pressed the 'Upload scan' button from home screen and he is redirected to the upload file flow`,
    );
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
    <View className="h-[340px] rounded-b-[50px] bg-primary-900 pt-[20px]">
      {DEVICE_TYPE.IOS && (
        <Toaster autoWiggleOnUpdate="toast-change" pauseWhenPageIsHidden />
      )}
      <SnakeLine className="absolute right-[150] top-[10]" />
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
              image={require('../../ui/assets/images/avatar.png')}
              size="large"
              shape="circle"
            />

            <View className="ml-4 gap-3">
              <View className="max-w-[220] flex-row items-center gap-1">
                <Text className="font-semibold-nunito text-2xl text-white">
                  {`${translate('general.welcome')}, ${userInfo?.userName}!`}
                </Text>
                <Text className="text-2xl">👋</Text>
              </View>
              <Text className="text-sm text-white">
                {translate('general.viewProfile')}
              </Text>
            </View>
          </View>
        </CardWrapper>

        <View className="absolute top-[200px] w-[85%] flex-col items-center self-center overflow-hidden rounded-[40px] border-[3px] border-primary-600 bg-primary-800  p-[20px]   dark:bg-charcoal-800">
          <SnakeLine
            className="absolute bottom-[-20] left-[-60]"
            color={isDark ? colors.charcoal[600] : colors.primary[700]}
          />
          <SnakeLine
            className="absolute left-[-90] top-[-70]"
            color={isDark ? colors.charcoal[600] : colors.primary[700]}
          />

          <SnakeLine
            className="absolute right-0 top-[130]"
            color={isDark ? colors.charcoal[600] : colors.primary[700]}
          />
          <SnakeLineRotated
            className="absolute right-[-30] top-[-15]"
            color={isDark ? colors.charcoal[600] : colors.primary[700]}
          />

          <Text className="text-center font-bold-nunito text-xl text-white">
            {translate('home.homeForeground.heading')}
          </Text>
          <Text className="mt-2 text-center text-sm text-white">
            {translate('home.homeForeground.subHeading')}
          </Text>
          <Button
            label={translate('uploadScan.title')}
            className={`mb-0 mt-4 h-[52]  rounded-full  border-[3px]  border-primary-600 bg-blackEerie active:bg-charcoal-800 dark:border-primary-900 dark:bg-blackEerie`}
            size="lg"
            textClassName="text-md font-semibold-nunito dark:text-white text-center"
            onPress={onStartUploadMediaFile}
            icon={
              <UploadIcon
                width={27}
                height={27}
                color={isDark ? colors.white : colors.white}
              />
            }
          />
        </View>
      </Animated.View>
    </View>
  );
};
