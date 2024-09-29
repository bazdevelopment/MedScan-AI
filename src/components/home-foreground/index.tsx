import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Button, colors, Text } from '@/ui';
import { MailIcon, UploadIcon } from '@/ui/icons';

import Avatar from '../avatar';
import UserInfoCard from '../user-info-card';
import { type IHomeForeground } from './home-forground.interface';

export const Foreground = ({ scrollValue }: IHomeForeground) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

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
    <View
      pointerEvents="none"
      className="h-[290px] rounded-b-[50px] bg-primary-300 pt-[20px]"
    >
      <Animated.View style={foregroundWrapperAnimatedStyle}>
        <View className="mr-10 mt-5 flex-row justify-end">
          <MailIcon color={colors.white} />
        </View>

        <View className="mt-8 flex-row items-center justify-between px-[35px]">
          <View>
            <Text className="text-white">Welcome</Text>
            <Text className="text-[24px] font-bold text-white">
              Robin Stewart
            </Text>
            <UserInfoCard age="24" className="mt-4" />
          </View>

          <Avatar
            imageUrl="https://randomuser.me/api/portraits/men/1.jpg"
            size="large"
          />
        </View>

        <View className="bg-tertiary-200 absolute top-[200px] w-4/5 flex-col items-center self-center rounded-[40px] p-[20px] dark:bg-charcoal-800">
          <Text className="text-md font-bold">Start using X-Ray Analizer</Text>
          <Text className="mt-4 text-center text-sm">
            Get vital information in an intuitive way required for better health
            & lifestyle of patients.
          </Text>
          <Button
            label="Upload report"
            className="mb-0 mt-4 w-[70%] rounded-full"
            size="lg"
            textClassName="text-md"
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
