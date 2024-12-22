/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { useScrollToTop } from '@react-navigation/native';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useRef } from 'react';

import { useSendGlobalPushNotifications } from '@/api/push-notifications/push-notifications.hooks';
import { logout } from '@/api/user/user.requests';
import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import { translate } from '@/core';
import { colors, FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';
import { Github, Rate, ShareIcon, Support, Website } from '@/ui/assets/icons';

export default function Settings() {
  const { colorScheme } = useColorScheme();
  const scrollViewRef = useRef(null);
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  const { mutate: onHandleGlobalPushNotifications } =
    useSendGlobalPushNotifications();

  useScrollToTop(scrollViewRef);

  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView ref={scrollViewRef}>
        <View className="mb-20 mt-6 flex-1 px-4">
          <Text className="text-xl font-bold"></Text>
          <Text className="text-3xl font-bold">
            {translate('settings.title')}
          </Text>

          <ItemsContainer title="settings.generale">
            <Item text="settings.profile" onPress={() => {}} />
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer title="settings.support_us">
            <Item
              text="settings.share"
              icon={<ShareIcon color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.rate"
              icon={<Rate color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.support"
              icon={<Support color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item text="settings.privacy" onPress={() => {}} />
            <Item text="settings.terms" onPress={() => {}} />
            <Item
              text="settings.github"
              icon={<Github color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.devMode.title">
            <Item
              text="settings.devMode.componentsLibrary"
              onPress={() => router.navigate('/ui-library')}
            />
          </ItemsContainer>

          <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={logout} />
              <Item
                text="Verify email"
                onPress={() => router.navigate('/verify-email')}
              />

              <Item
                text="Send global push notification"
                onPress={() =>
                  onHandleGlobalPushNotifications({
                    title: 'This is a global notification',
                    body: 'This is a global notification body',
                  })
                }
              />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
