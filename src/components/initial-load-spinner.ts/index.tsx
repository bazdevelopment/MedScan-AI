import { useColorScheme } from 'nativewind';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { LOADING_MESSAGES_INITIAL_APP_LOAD } from '@/constants/loading-messages';
import { colors } from '@/ui';

import BounceLoader from '../bounce-loader';
import Branding from '../branding';
import { SnakeLine, SnakeLineRotated } from '../snake-line';

const InitialLoadSpinner = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-1 items-center justify-center gap-3 bg-primary-900 dark:bg-blackEerie">
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute right-[150] top-[70]"
      />
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute right-[50] top-[40]"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute left-[40] top-0"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute left-[170] top-[-120]"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute left-[200] top-[-20]"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute right-[-10] top-[-20]"
      />
      <Branding isLogoVisible className="top-[-25]" />
      {/* Rotating Spinner */}
      <ActivityIndicator
        size="large"
        className=" items-center justify-center"
        color={isDark ? colors.charcoal[300] : colors.charcoal[100]}
      />
      {/* Fading Loading Message */}
      <BounceLoader loadingMessages={LOADING_MESSAGES_INITIAL_APP_LOAD} />
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute bottom-[-10] z-[-1]"
      />
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute bottom-[-10] left-[-10px] z-[-1]"
      />
      <SnakeLine
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute bottom-[120] left-[-50px] z-[-1]"
      />
      <SnakeLineRotated
        color={isDark ? colors.charcoal[600] : colors.primary[600]}
        className="absolute bottom-0 right-[-10] z-[-1]"
      />
    </View>
  );
};

export default InitialLoadSpinner;
