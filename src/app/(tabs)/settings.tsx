/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { useScrollToTop } from '@react-navigation/native';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useRef } from 'react';

import { useUploadPrivacyPolicy } from '@/api/privacy-policy/privacy-policy.hooks';
import {
  useSendGlobalPushNotifications,
  useSendIndividualPushNotification,
} from '@/api/push-notifications/push-notifications.hooks';
import { useUploadTermsOfService } from '@/api/terms-of-service/terms-of-service.hooks';
import { useUser } from '@/api/user/user.hooks';
import { logout } from '@/api/user/user.requests';
import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import { useSelectedLanguage } from '@/core';
import { colors, ScrollView, View } from '@/ui';
import { Github, Rate, ShareIcon, Website } from '@/ui/assets/icons';

export default function Settings() {
  const { colorScheme } = useColorScheme();
  const { language } = useSelectedLanguage();
  const { data: userInfo } = useUser(language);

  const scrollViewRef = useRef(null);
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  const { mutate: onHandleGlobalPushNotifications } =
    useSendGlobalPushNotifications();

  const { mutate: onHandleIndividualNotification } =
    useSendIndividualPushNotification();
  useScrollToTop(scrollViewRef);

  const { mutate: onUploadTermsOfService } = useUploadTermsOfService();
  const { mutate: onUploadPrivacyPolicy } = useUploadPrivacyPolicy();

  return (
    <View className="flex-1">
      {/* <FocusAwareStatusBar /> */}

      <ScrollView ref={scrollViewRef}>
        <View className="mb-20 mt-2 flex-1 px-4">
          <ItemsContainer title="settings.generale">
            <Item
              text="settings.profile"
              onPress={() => router.navigate('/profile')}
            />
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
              onPress={() => router.navigate('/share')}
            />
            <Item
              text="settings.rate"
              icon={<Rate color={iconColor} />}
              onPress={() => router.navigate('/rate')}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item
              text="settings.privacy"
              onPress={() => router.navigate('/privacy-policy')}
            />
            <Item
              text="settings.terms"
              onPress={() => router.navigate('/terms-of-service')}
            />
            <Item
              text="settings.faq"
              onPress={() => console.log('go to faq screen')}
            />
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
                    title: 'This is a global notification title',
                    body: 'This is a global notification body',
                    language,
                  })
                }
              />
              <Item
                text="Send individual push notification"
                onPress={() =>
                  onHandleIndividualNotification({
                    title: 'This is an individual notification title',
                    body: 'This is an individual notification body',
                    userId: userInfo.userId,
                    language,
                  })
                }
              />
              <Item
                text="Upload terms of service"
                onPress={() => onUploadTermsOfService({ language })}
              />
              <Item
                text="Upload privacy policy"
                onPress={() => onUploadPrivacyPolicy({ language })}
              />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
