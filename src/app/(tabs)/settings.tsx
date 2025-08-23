/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { useScrollToTop } from '@react-navigation/native';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useRef } from 'react';
import { Linking } from 'react-native';
import { Toaster } from 'sonner-native';

import { useUploadPrivacyPolicy } from '@/api/privacy-policy/privacy-policy.hooks';
import {
  useSendGlobalPushNotifications,
  useSendIndividualPushNotification,
} from '@/api/push-notifications/push-notifications.hooks';
import { useAddFieldsToCollection } from '@/api/services/services.hooks';
import { useUploadTermsOfService } from '@/api/terms-of-service/terms-of-service.hooks';
import {
  useGrantFreeScans,
  useUpdateUser,
  useUser,
} from '@/api/user/user.hooks';
import { logout } from '@/api/user/user.requests';
import CustomAlert from '@/components/custom-alert';
import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ShareItem } from '@/components/settings/share-item';
import { ThemeItem } from '@/components/settings/theme-item';
import Toast from '@/components/toast';
import UpgradeBanner from '@/components/upgrade-banner';
import { DEVICE_TYPE, translate, useSelectedLanguage } from '@/core';
import useRemoteConfig from '@/core/hooks/use-remote-config';
import { Button, colors, ScrollView, View } from '@/ui';
import { LogoutIcon, Rate } from '@/ui/assets/icons';

export default function Settings() {
  const { colorScheme } = useColorScheme();
  const { language } = useSelectedLanguage();
  const { data: userInfo } = useUser(language);

  const { mutateAsync: onUpdateUser, isPending: isPendingUpdateUser } =
    useUpdateUser();

  const { SHOW_FAQ_SCREEN, SHOW_RATE_SCREEN, SHOW_ADMIN_SCREENS } =
    useRemoteConfig();

  const scrollViewRef = useRef(null);
  const iconColor = colorScheme === 'dark' ? colors.neutral[50] : colors.black;

  const { mutate: onHandleGlobalPushNotifications } =
    useSendGlobalPushNotifications();

  const { mutate: onAddFieldsToCollection } = useAddFieldsToCollection();

  const { mutate: onHandleIndividualNotification } =
    useSendIndividualPushNotification();
  useScrollToTop(scrollViewRef);
  const { mutate: onGrantFreeScans } = useGrantFreeScans();

  const { mutate: onUploadTermsOfService } = useUploadTermsOfService();
  const { mutate: onUploadPrivacyPolicy } = useUploadPrivacyPolicy();

  const handleLogout = async () => {
    Toast.showCustomToast(
      <CustomAlert
        visible
        title={translate('general.attention')}
        subtitle={translate('alerts.logoutQuestion')}
        buttons={[
          {
            label: translate('general.close'),
            variant: 'default',
            onPress: () => Toast.dismiss(),
            className:
              'flex-1 rounded-xl h-[48] bg-slate-100 active:opacity-80',
            buttonTextClassName: 'text-black',
          },
          {
            label: translate('general.yes'),
            variant: 'destructive',
            onPress: async () => {
              try {
                await onUpdateUser({
                  language,
                  userId: userInfo.userId,
                  fieldsToUpdate: {
                    verificationCode: '',
                    verificationCodeExpiry: '',
                    isOtpVerified:
                      userInfo.email === Env.EXPO_PUBLIC_TEST_ACCOUNT ||
                      userInfo.isAnonymous
                        ? true
                        : false,
                  },
                });
                logout();
              } catch (error) {
                Toast.error(translate('alerts.logoutUnsuccessful'));
              }
            },
            className: 'flex-1 rounded-xl h-[48] active:opacity-80',
          },
        ]}
      />,
      {
        position: 'middle', // Place the alert in the middle of the screen
        duration: Infinity, // Keep the alert visible until dismissed
      },
    );
  };

  return (
    <View className="mt-[-15px] flex-1 bg-primary-50 dark:bg-blackEerie">
      {DEVICE_TYPE.IOS && (
        <Toaster autoWiggleOnUpdate="toast-change" pauseWhenPageIsHidden />
      )}

      {userInfo.scansRemaining <= 0 && userInfo.isFreeTrialOngoing && (
        <UpgradeBanner
          className="mx-4 mt-4"
          onUpgradePress={() => router.navigate('/paywall-new')}
        />
      )}
      <ScrollView ref={scrollViewRef}>
        <View className="mb-20 mt-[-20px] px-6">
          <ItemsContainer title="settings.generale">
            <Item
              text="settings.profile"
              onPress={() => router.navigate('/profile')}
            />
            <LanguageItem />
            <ThemeItem />
            <Item
              text="settings.contactUs"
              onPress={() => router.navigate('/contact-us')}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer title="settings.support_us">
            <ShareItem />

            {SHOW_RATE_SCREEN && (
              <Item
                text="settings.rate"
                icon={<Rate color={iconColor} />}
                onPress={() => router.navigate('/rate')}
              />
            )}
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item
              text="settings.privacy"
              onPress={() =>
                Linking.openURL('https://medscanaiprivacy.netlify.app/')
              }
            />
            <Item
              text="settings.terms"
              onPress={() =>
                Linking.openURL('https://medscanaitermsconditions.netlify.app/')
              }
            />
            {SHOW_FAQ_SCREEN && (
              <Item
                text="settings.faq"
                onPress={() => console.log('go to faq screen')}
              />
            )}
          </ItemsContainer>

          <Button
            label={translate('settings.logout')}
            icon={<LogoutIcon width={30} height={30} />}
            loading={isPendingUpdateUser}
            variant="destructive"
            className="mt-4 h-[55px] justify-start pl-5"
            textClassName="font-semibold-nunito text-lg"
            iconPosition="left"
            onPress={handleLogout}
          />

          {__DEV__ &&
            SHOW_ADMIN_SCREENS && ( //change the condition here so this will be available in dev/prod only for an admin account
              <>
                <ItemsContainer title="settings.devMode.title">
                  <Item
                    text="settings.devMode.componentsLibrary"
                    onPress={() => router.navigate('/ui-library')}
                  />
                </ItemsContainer>

                <View>
                  <ItemsContainer title="Utils">
                    <Item
                      text="Verify email"
                      onPress={() => router.navigate('/verify-email')}
                    />

                    <Item
                      text="Send global push notification"
                      onPress={() =>
                        onHandleGlobalPushNotifications({
                          title: 'New Version Available! 🚀',
                          body: "Dear user, a new version v25.8.2 for MedScan AI - Medical AI Assistant app is now available!📱 Upgrade to this version for new features, bug fixes, and an improved experience. If you've already upgraded, you're all set!",
                          language,
                        })
                      }
                    />
                    <Item
                      text="Send individual push notification"
                      onPress={() =>
                        onHandleIndividualNotification({
                          title: 'test',
                          body: 'test',
                          // title: 'Notice About Personal Medical Images',
                          // body: 'We DO NOT encourage uploading personal medical images to MedScan AI for individual analysis, as the results should not be considered final. Our AI models are still being researched and refined, and potential inaccuracies may occur. It’s great for learning and get general insights, but for in-depth reviews, consult a specialist. If you have any questions contact us via email - medscanaiapp@gmail.com',
                          userId: 'LFwYyNDljVaUlyMR6emuA3d8JBy1',
                          language,
                        })
                      }
                    />

                    {/* <Item
                      text="Grant free scans action"
                      onPress={onGrantFreeScans}
                    /> */}
                    <Item
                      text="Upload terms of service"
                      onPress={() => onUploadTermsOfService({ language })}
                    />
                    <Item
                      text="Upload privacy policy"
                      onPress={() => onUploadPrivacyPolicy({ language })}
                    />
                    <Item
                      text="Add completedScans field to userInfo"
                      //! be careful with the below functions
                      onPress={() =>
                        onAddFieldsToCollection({
                          fields: {
                            //add fields here
                            // completedScans: 0,
                          },
                          collectionName: 'users',
                        })
                      }
                    />
                  </ItemsContainer>
                </View>
              </>
            )}
        </View>
      </ScrollView>
    </View>
  );
}
