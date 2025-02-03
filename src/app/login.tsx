/* eslint-disable max-lines-per-function */
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

import { useLoginWithEmail } from '@/api/user/user.hooks';
import Branding from '@/components/branding';
import { SnakeLine, SnakeLineRotated } from '@/components/snake-line';
import { DEVICE_TYPE, translate, useSelectedLanguage } from '@/core';
import getDeviceSizeCategory from '@/core/utilities/get-device-size-category';
import { Button, colors, FocusAwareStatusBar, Input, Text, View } from '@/ui';
import { MailIcon } from '@/ui/assets/icons';

export default function Login() {
  return (
    <>
      <FocusAwareStatusBar />
      <LoginPage />
    </>
  );
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const { language } = useSelectedLanguage();
  const { isVerySmallDevice, isMediumDevice } = getDeviceSizeCategory();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { mutate: handleLoginViaEmail, isPending: isLoginPending } =
    useLoginWithEmail({ email })();

  const handleUpdateEmail = (text: string) => setEmail(text.toLowerCase());

  return (
    <KeyboardStickyView
      className="flex-1"
      offset={{
        opened: isVerySmallDevice
          ? 0
          : isMediumDevice
            ? DEVICE_TYPE.IOS
              ? 250
              : 200
            : 250,
      }}
    >
      <FocusAwareStatusBar hidden />
      <ScrollView contentContainerStyle={{ overflow: 'hidden', flex: 1 }}>
        <View
          className={`flex-1 bg-primary-900 px-6 pt-14 dark:bg-blackEerie ${isVerySmallDevice && 'pt-[10%]'}`}
        >
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
          {isLoginPending && (
            <ActivityIndicator
              size="small"
              color={isDark ? colors.charcoal[300] : colors.charcoal[700]}
            />
          )}

          <Text
            testID="form-title"
            className={`mt-10 font-bold-nunito text-[32px] text-white ${isVerySmallDevice && 'mt-4'}`}
          >
            {`${translate('general.welcomeBack')} 👋`}
          </Text>

          <Text className="my-4 text-lg text-white">
            {translate('auth.loginViaEmailHeading')}
          </Text>

          <View className="mt-4 rounded-3xl bg-white p-6 dark:bg-blackBeauty">
            <Input
              testID="email"
              label={translate('auth.emailAddress')}
              value={email}
              placeholder="name@example.com"
              onChangeText={handleUpdateEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete={undefined}
              autoCorrect={false}
              // autoFocus
              className="flex-1 rounded-xl bg-white px-3.5 py-5 font-primary-nunito dark:border-neutral-700 dark:bg-charcoal-800 dark:text-white"
              icon={<MailIcon />}
            />

            <View className="mt-1 w-full flex-row flex-wrap">
              <Text className="text-sm">By continuing, you agree to our </Text>
              <Link
                href="/terms-of-service"
                className="text-sm text-primary-900"
              >
                Terms & Conditions
              </Link>
              <Text className="text-sm"> and </Text>
              <Link href="/privacy-policy" className="text-sm text-primary-900">
                Privacy Policy
              </Link>
            </View>

            <Button
              label={translate('general.continue')}
              variant="default"
              className="mt-6 h-[55px] w-full rounded-xl border-2 border-primary-900 bg-primary-900 pl-5 dark:bg-primary-900"
              textClassName="text-lg text-center text-white dark:text-white"
              iconPosition="left"
              onPress={() => handleLoginViaEmail({ email, language })}
              disabled={isLoginPending || !email}
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
