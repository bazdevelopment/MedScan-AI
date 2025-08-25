/* eslint-disable max-lines-per-function */
import { firebaseAuth } from 'firebase/config';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { Keyboard, Linking, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

import { useCreateAnonymousAccount } from '@/api/user/user.hooks';
import Branding from '@/components/branding';
import { SnakeLine, SnakeLineRotated } from '@/components/snake-line';
import { DEVICE_TYPE, translate, useSelectedLanguage } from '@/core';
import { useStoreUserId } from '@/core/hooks/use-store-user-id';
import getDeviceSizeCategory from '@/core/utilities/get-device-size-category';
import { Button, colors, FocusAwareStatusBar, Input, Text, View } from '@/ui';
import { UserIcon } from '@/ui/assets/icons';

export default function AnonymousLogin() {
  const [username, setUsername] = useState('');
  const { language } = useSelectedLanguage();
  const { isVerySmallDevice, isMediumDevice } = getDeviceSizeCategory();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [storedUserId, setUserId] = useStoreUserId();

  const onSuccessHandler = (userId: string) => {
    //update internal storage with userId
    setUserId(userId);
  };

  const { mutate: onCreateAnonymousAccount, isPending: isLoginPending } =
    useCreateAnonymousAccount(onSuccessHandler);

  const handleUpdateEmail = (text: string) => setUsername(text);

  return (
    <>
      <FocusAwareStatusBar hidden />
      <KeyboardStickyView
        className="flex-1"
        offset={{
          opened: isVerySmallDevice
            ? 0
            : isMediumDevice
              ? DEVICE_TYPE.IOS
                ? 250
                : 200
              : 270,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            overflow: 'hidden',
            flex: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            className={`flex-1 bg-primary-900 px-6 pt-20 dark:bg-blackEerie ${isVerySmallDevice && 'pt-[10%]'} ${isMediumDevice && 'pt-[20%]'}`}
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

            <Text
              testID="form-title"
              className={`mt-14 font-bold-nunito text-[32px] text-white ${isVerySmallDevice && 'mt-4'}`}
            >
              {translate('rootLayout.screens.namePreferenceScreen.heading')}
            </Text>

            <Text className="my-4 text-xl text-white">
              {translate(
                'rootLayout.screens.namePreferenceScreen.preferredNameQuestion',
              )}
            </Text>

            <View className="mt-10 rounded-3xl bg-white p-6 dark:bg-blackBeauty">
              <Input
                testID="username"
                label={translate('components.Input.labels.nickname')}
                value={username}
                placeholder={translate(
                  'rootLayout.screens.namePreferenceScreen.placeholderPreferredName',
                )}
                style={{ fontSize: !username.length ? 12 : 14 }}
                onChangeText={handleUpdateEmail}
                autoCapitalize="sentences"
                keyboardType="default"
                autoComplete={undefined}
                autoCorrect={false}
                // autoFocus
                className="h-16 flex-1 rounded-xl bg-white px-3.5 py-5 font-primary-nunito dark:border-neutral-700 dark:bg-charcoal-800 dark:text-white"
                icon={<UserIcon top={3} />}
              />

              <View className="mt-1 w-full flex-row flex-wrap items-center">
                <Text className="text-sm">
                  {translate('rootLayout.screens.login.agreeingMessage')}{' '}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://medscanaitermsconditions.netlify.app/',
                    )
                  }
                >
                  <Text className="text-sm text-primary-900 dark:text-primary-900">
                    {translate('rootLayout.screens.login.termsAndConditions')}
                  </Text>
                </TouchableOpacity>
                <Text className="text-sm"> {translate('general.and')} </Text>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://medscanaiprivacy.netlify.app/')
                  }
                >
                  <Text className="text-sm text-primary-900 dark:text-primary-900">
                    {translate('rootLayout.screens.login.privacyPolicy')}
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                label={translate('general.continue')}
                variant="default"
                className="mt-6 h-[55px] w-full rounded-xl border-2 border-primary-900 bg-primary-900 pl-5 dark:bg-primary-900"
                textClassName="text-lg text-center text-white dark:text-white"
                iconPosition="left"
                onPress={() => {
                  onCreateAnonymousAccount({
                    username,
                    language,
                    // submit the stored user id, otherwise check for firebase uid
                    //do not rely only on firebaseAuth.currentUser?.uid,because if the user logs out it will become undefined, but the storedUserId will still be populated
                    actualUserId: storedUserId || firebaseAuth.currentUser?.uid,
                  });
                  Keyboard.dismiss();
                }}
                disabled={!username}
                loading={isLoginPending}
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
    </>
  );
}
