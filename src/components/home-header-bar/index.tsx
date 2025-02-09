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
import { DEVICE_TYPE, translate, useSelectedLanguage } from '@/core';
import { useCrashlytics } from '@/core/hooks/use-crashlytics';
import { Button, colors, View } from '@/ui';
import { UploadIcon } from '@/ui/assets/icons';

import Branding from '../branding';
import { SnakeLine, SnakeLineRotated } from '../snake-line';
import { type IHomeHeaderBar } from './home-header-bar.interface';

const DEFAULT_TOP_INSET = 30;

export const HomeHeaderBar = ({ scrollValue }: IHomeHeaderBar) => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { language } = useSelectedLanguage();
  const { logEvent } = useCrashlytics();

  const { data: userInfo } = useUser(language);

  const onStartUploadMediaFile = () => {
    if (userInfo?.scansRemaining <= 0) {
      logEvent(
        `Alert informing user - ${userInfo.userId} that there are no scans available is displayed in home header bar`,
      );
      alert(translate('home.homeForeground.maxNumberOfScans'));
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
        className={`w-full ${DEVICE_TYPE.IOS ? 'h-[130px]' : 'h-[110px]'}`}
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
          marginTop: DEVICE_TYPE.IOS ? -10 : 0,
        }}
      >
        <Animated.View style={headerDetailsContainerAnimatedStyle}>
          <Branding isLogoVisible invertedColors={DEVICE_TYPE.IOS} />
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
            color={isDark ? colors.charcoal[600] : colors.primary[400]}
            className="absolute left-[-180px] top-[-80px] z-[-1]"
          />

          <SnakeLine
            color={isDark ? colors.charcoal[600] : colors.primary[400]}
            className="absolute left-[-120px] top-[-70px] z-[-1]"
          />

          <SnakeLineRotated
            color={isDark ? colors.charcoal[600] : colors.primary[400]}
            className="absolute left-[30px] top-[-50px] z-[-1]"
          />
          <SnakeLineRotated
            color={isDark ? colors.charcoal[600] : colors.primary[400]}
            className="absolute left-[150] top-[-50px] z-[-1] "
          />
        </Animated.View>
      </Animated.View>
    </>
  );
};
