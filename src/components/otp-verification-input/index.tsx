import { OTPInput, type OTPInputRef } from 'input-otp-native';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { wait } from '@/core/utilities/wait';
import { Text } from '@/ui';

import {
  type IOtpVerificationInput,
  type ISlotProps,
} from './otp-verification-input.interface';

export default function OTPVerificationInput({
  className,
  isLoading,
  isError,
  onComplete,
}: IOtpVerificationInput) {
  const ref = useRef<OTPInputRef>(null);
  const onCheckVerificationCode = (code: string) => {
    onComplete(code);
  };

  useEffect(() => {
    if (isError) {
      wait(1000).then(() => ref.current?.clear());
    }
  }, [isError]);

  return (
    <OTPInput
      ref={ref}
      onComplete={onCheckVerificationCode}
      maxLength={6}
      autoFocus
      render={({ slots }) => (
        <View
          className={`my-4 flex-row items-center justify-center gap-4 ${className}`}
        >
          {slots.map((slot, idx) => (
            <Slot key={idx} isLoading={isLoading} isError={isError} {...slot} />
          ))}
        </View>
      )}
    />
  );
}

function Slot({
  char,
  isActive,
  hasFakeCaret,
  isLoading,
  isError,
}: ISlotProps) {
  return (
    <View
      className={`h-[56px] w-[40px] items-center justify-center rounded-xl  bg-white dark:bg-blackEerie ${isActive || isLoading ? 'border-[3px] border-primary-900' : 'border border-charcoal-200 dark:border-charcoal-600'} ${isError && 'border-[3px]  border-red-400 dark:border-red-400'}`}
    >
      {!!char && (
        <Text className="font-medium-nunito text-base text-gray-900">
          {char}
        </Text>
      )}
      {hasFakeCaret && <FakeCaret />}
    </View>
  );
}

const FakeCaret = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 }),
      ),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="absolute h-full w-full items-center justify-center">
      <Animated.View
        className="h-[28px] w-[2px] rounded-sm bg-primary-900"
        style={animatedStyle}
      />
    </View>
  );
};
