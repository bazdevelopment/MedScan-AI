/* eslint-disable max-lines-per-function */
import { BlurView } from 'expo-blur';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, colors } from '@/ui';
import { UploadIcon } from '@/ui/icons';

import GradientText from '../gradient-text';
import { type IHomeHeaderBar } from './home-header-bar.interface';

const DEFAULT_TOP_INSET = 30;

export const HomeHeaderBar = ({ scrollValue }: IHomeHeaderBar) => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

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
        className="h-[120px] w-full"
      >
        <BlurView
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: isDark ? colors.charcoal[800] : colors.muzli,
              opacity: 0.98,
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
          <GradientText colors={[colors.lightSkyBlue, colors.primaryPurple]}>
            <Text className="font-bold dark:text-primary-400">
              Welcome, Robin Stewart
            </Text>
          </GradientText>
        </Animated.View>

        <Animated.View style={[headerDetailsContainerAnimatedStyle]}>
          <Button
            label="Upload report"
            className=" rounded-full"
            icon={
              <UploadIcon
                width={26}
                height={26}
                color={isDark ? colors.black : colors.white}
              />
            }
          />
        </Animated.View>
      </Animated.View>
    </>
  );
};
