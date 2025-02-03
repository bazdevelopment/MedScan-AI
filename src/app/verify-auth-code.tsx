/* eslint-disable max-lines-per-function */
import { router, useLocalSearchParams } from 'expo-router';
import { firebaseAuth } from 'firebase/config';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

import { useLoginWithEmail, useValidateAuthCode } from '@/api/user/user.hooks';
import Branding from '@/components/branding';
import OTPVerificationInput from '@/components/otp-verification-input';
import { SnakeLine, SnakeLineRotated } from '@/components/snake-line';
import {
  DEVICE_TYPE,
  translate,
  useIsFirstTime,
  useSelectedLanguage,
} from '@/core';
import getDeviceSizeCategory from '@/core/utilities/get-device-size-category';
import { Button, colors, FocusAwareStatusBar, Text } from '@/ui';
import { ArrowLeft } from '@/ui/assets/icons';

const VerifyAuthCode = () => {
  const { email } = useLocalSearchParams();
  const [isFirstTime] = useIsFirstTime();
  const { isMediumDevice } = getDeviceSizeCategory();
  const {
    mutate: onVerifyAuthCode,
    isPending,
    isError,
  } = useValidateAuthCode({ isFirstTime })();
  const userEmail = email || firebaseAuth.currentUser?.email;

  const { mutate: handleLoginViaEmail, isPending: isResendCodePending } =
    useLoginWithEmail({ email: userEmail })();

  const handleVerifyAuthCode = (authenticationCode: string) =>
    onVerifyAuthCode({
      authenticationCode,
      email: (email as string) || (firebaseAuth.currentUser?.email as string),
      language,
    });

  const { language } = useSelectedLanguage();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <KeyboardStickyView
      className="flex-1"
      offset={{ opened: isMediumDevice ? (DEVICE_TYPE.IOS ? 250 : 120) : 250 }}
    >
      <FocusAwareStatusBar hidden />
      <ScrollView contentContainerStyle={{ flex: 1, overflow: 'hidden' }}>
        <View className="flex-1 bg-primary-900 px-6 pt-14 dark:bg-blackEerie">
          <SnakeLine
            color={isDark ? colors.charcoal[600] : colors.primary[600]}
            className="absolute right-[150] top-[70]"
          />
          <SnakeLine
            color={isDark ? colors.charcoal[600] : colors.primary[600]}
            className="absolute right-[50] top-[60]"
          />
          <SnakeLineRotated
            color={isDark ? colors.charcoal[600] : colors.primary[600]}
            className="absolute left-[100] top-[-20]"
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

          <Branding isLogoVisible />

          <Text
            testID="form-title"
            className="mt-10 font-bold-nunito text-[32px] text-white"
          >
            {`${translate('general.welcomeBack')} 👋`}
          </Text>

          <Text className="my-4 text-lg text-white">
            Enter your verification code sent via email. Please note, the code
            will expire in 5 minutes.
          </Text>

          <View className="mt-4 rounded-3xl bg-white p-6 dark:bg-blackBeauty">
            <Text className="text-center text-base">
              We have sent the verification code to
            </Text>
            <Text className="text-center font-semibold-nunito text-base text-primary-900 dark:text-primary-700">
              {userEmail}
            </Text>
            {(isPending || isResendCodePending) && (
              <ActivityIndicator
                size="small"
                color={colors.charcoal[300]}
                className="mt-4"
              />
            )}
            <OTPVerificationInput
              className="mt-8"
              isLoading={isPending}
              isError={isError}
              onComplete={handleVerifyAuthCode}
            />
            <View className="mt-3 flex-row items-center justify-center">
              <Text className="text-center font-semibold-nunito">
                Didn't get the code?
              </Text>
              <Button
                onPress={() =>
                  handleLoginViaEmail({ email: userEmail, language })
                }
                variant="default"
                label="Resend code"
                className="m-0 ml-2 bg-white p-0 active:opacity-60 dark:bg-transparent"
                textClassName="text-primary-900 font-semibold-nunito text-base dark:text-primary-700"
              />
            </View>

            <Button
              onPress={() => router.navigate('/login')}
              variant="default"
              label="Back to Sign In"
              className="m-0 ml-2 mt-4 gap-2 self-start bg-white p-0 active:opacity-60 dark:bg-transparent"
              textClassName="text-primary-900 font-semibold-nunito text-base dark:text-white"
              icon={
                <ArrowLeft
                  width={22}
                  height={22}
                  color={isDark ? colors.primary[700] : colors.primary[900]}
                />
              }
              iconPosition="left"
            />
          </View>

          <SnakeLine
            color={isDark ? colors.charcoal[600] : colors.primary[600]}
            className="absolute bottom-[-10] z-[-1]"
          />
          <SnakeLine
            color={isDark ? colors.charcoal[600] : colors.primary[600]}
            className="absolute bottom-[-10] left-[160px] z-[-1]"
          />
          <SnakeLine
            color={isDark ? colors.charcoal[600] : colors.primary[600]}
            className="absolute bottom-[160] left-[-50px] z-[-1]"
          />

          <SnakeLineRotated
            color={isDark ? colors.charcoal[600] : colors.primary[600]}
            className="absolute bottom-0 right-[-10] z-[-1]"
          />
        </View>
      </ScrollView>
    </KeyboardStickyView>
  );
};

export default VerifyAuthCode;
