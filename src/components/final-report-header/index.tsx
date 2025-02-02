/* eslint-disable max-lines-per-function */
import { BlurView } from '@react-native-community/blur';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { translate } from '@/core';
import { colors } from '@/ui';
import { DownloadIcon, ShareIcon } from '@/ui/assets/icons';

import { type IHomeHeaderBar } from '../home-header-bar/home-header-bar.interface';

export const FinalReportHeader = ({ scrollValue }: IHomeHeaderBar) => {
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
        [0, 100, 150],
        [0, 0, 1],
        'clamp',
      ),
    };
  }, [scrollValue]);

  return (
    <>
      <Animated.View
        style={[headerContainerAnimatedStyle]}
        className="h-[60px] w-full"
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
          top: 20,
          left: insets.left,
          right: insets.right,
        }}
      >
        <Animated.View style={headerDetailsContainerAnimatedStyle}>
          <Text className="font-bold-nunito dark:text-primary-900">
            {translate('flows.createReport.finalReportHeader.message')}
          </Text>
        </Animated.View>

        <Animated.View style={[headerDetailsContainerAnimatedStyle]}>
          <View className="flex-row gap-6">
            <ShareIcon color={colors.black} width={20} height={20} />
            <DownloadIcon color={colors.black} width={20} height={20} />
          </View>
        </Animated.View>
      </Animated.View>
    </>
  );
};
