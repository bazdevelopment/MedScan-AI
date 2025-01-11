/* eslint-disable max-lines-per-function */
import { BlurView } from 'expo-blur';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUser } from '@/api/user/user.hooks';
import { translate, useSelectedLanguage } from '@/core';
import { Button, colors } from '@/ui';
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
  const { data: userInfo } = useUser(language);

  const onStartUploadMediaFile = () => {
    if (userInfo?.scansRemaining <= 0) {
      alert(
        'You reached the maximum number of scan! Please upgrade to premium!',
      );
    }
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
        className="h-[130px] w-full"
      >
        <BlurView
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: isDark
                ? colors.charcoal[600]
                : colors.primary[900],
              opacity: 1,
            },
          ]}
        />
      </Animated.View>

      <Animated.View
        className="absolute mx-4 flex-row items-center justify-between"
        style={{
          top: insets.top || DEFAULT_TOP_INSET,
          left: insets.left,
          right: insets.right,
        }}
      >
        <Animated.View style={headerDetailsContainerAnimatedStyle}>
          <Branding isLogoVisible />
          {/* <GradientText colors={[colors.lightSkyBlue, colors.primaryPurple]}>
            <Text className="font-bold dark:text-primary-900">
              {`${translate('general.welcome')}, ${userInfo?.userName}!`}
            </Text>
          </GradientText> */}
        </Animated.View>

        <Animated.View style={[headerDetailsContainerAnimatedStyle]}>
          <Button
            label={translate('uploadScan.title')}
            className="rounded-full"
            onPress={onStartUploadMediaFile}
            icon={
              <UploadIcon
                width={26}
                height={26}
                color={isDark ? colors.black : colors.white}
              />
            }
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
