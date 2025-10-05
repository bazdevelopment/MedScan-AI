/* eslint-disable max-lines-per-function */
import { BlurView } from '@react-native-community/blur';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUser } from '@/api/user/user.hooks';
import {
  DEVICE_TYPE,
  translate,
  useIsFirstTime,
  useSelectedLanguage,
} from '@/core';
import { useCrashlytics } from '@/core/hooks/use-crashlytics';
import { wait } from '@/core/utilities/wait';
import { Button, colors, View } from '@/ui';
import { UploadIcon } from '@/ui/assets/icons';

import Branding from '../branding';
import CustomAlert from '../custom-alert';
import { SnakeLine, SnakeLineRotated } from '../snake-line';
import Toast from '../toast';
import { type IHomeHeaderBar } from './home-header-bar.interface';

const DEFAULT_TOP_INSET = 30;

export const HomeHeaderBar = ({ scrollValue }: IHomeHeaderBar) => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const [isFirstTime, setIsFirstTime] = useIsFirstTime();

  const isDark = colorScheme === 'dark';
  const { language } = useSelectedLanguage();
  const { logEvent } = useCrashlytics();

  const { data: userInfo } = useUser(language);

  const onStartUploadMediaFile = () => {
    /**
     * isFirstTime is used to check if the user installs the app for the first time
     * usually this variable is set to false after first onboarding, but if the first onboarding is not shown again after reinstallation, the thi variable will remain to true
     * thats why we need to set it to false based on an action instead of creating another useEffect in layout
     *  */
    isFirstTime && setIsFirstTime(false);

    if (userInfo?.scansRemaining <= 0 && userInfo.isFreeTrialOngoing) {
      logEvent(
        `Alert informing user - ${userInfo.userId} that there are no scans available is displayed in home header bar`,
      );
      return Toast.showCustomToast(
        <CustomAlert
          title={translate('general.attention')}
          subtitle={translate('alerts.chatAndMediaFilesLimit')}
          buttons={[
            {
              label: translate('components.UpgradeBanner.heading'),
              variant: 'default',
              onPress: () =>
                wait(500).then(() => router.navigate('/paywall-new')), // a small delay in mandatory for Toast, not sure why
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
      `User - ${userInfo.userId} pressed the 'Upload scan' button from home header bar and he is redirected to the upload file flow`,
    );
  };

  const headerContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, 110, 150],
        [0, 0, 1],
        'clamp',
      ),
    };
  }, [scrollValue]);

  const headerDetailsContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, 250, 280],
        [0, 0, 1],
        'clamp',
      ),
    };
  }, [scrollValue]);

  return (
    <>
      <Animated.View
        style={[headerContainerAnimatedStyle]}
        className="h-[110px] w-full"
      >
        {DEVICE_TYPE.IOS ? (
          <BlurView
            blurType={isDark ? 'dark' : 'regular'}
            style={[
              StyleSheet.absoluteFill,

              {
                backgroundColor: isDark ? undefined : colors.transparent,
                opacity: 1,
              },
            ]}
          />
        ) : (
          <View className="h-[110px] bg-primary-900 dark:bg-charcoal-500" />
        )}
      </Animated.View>

      <Animated.View
        className="absolute mx-4 flex-row items-center justify-between"
        style={{
          top: insets.top || DEFAULT_TOP_INSET,
          left: insets.left,
          right: insets.right,
          marginTop: DEVICE_TYPE.IOS ? -20 : 0,
        }}
      >
        <Animated.View style={headerDetailsContainerAnimatedStyle}>
          <Branding invertedColors={DEVICE_TYPE.IOS} />
        </Animated.View>

        <Animated.View style={[headerDetailsContainerAnimatedStyle]}>
          <Button
            label={translate('uploadScan.title')}
            className="h-[50] rounded-full border-[3px] border-primary-600 dark:bg-blackEerie"
            textClassName="dark:text-white"
            onPress={onStartUploadMediaFile}
            icon={<UploadIcon width={26} height={26} color={colors.white} />}
          />
          <SnakeLineRotated
            color={isDark ? colors.charcoal[600] : colors.primary[600]}
            className="absolute left-[-180px] top-[-80px] z-[-1]"
          />

          <SnakeLine
            color={isDark ? colors.charcoal[600] : colors.primary[600]}
            className="absolute left-[-120px] top-[-70px] z-[-1]"
          />

          <SnakeLineRotated
            color={isDark ? colors.charcoal[600] : colors.primary[600]}
            className="absolute left-[30px] top-[-50px] z-[-1]"
          />
          <SnakeLineRotated
            color={isDark ? colors.charcoal[600] : colors.primary[600]}
            className="absolute left-[150] top-[-50px] z-[-1] "
          />
        </Animated.View>
      </Animated.View>
    </>
  );
};
