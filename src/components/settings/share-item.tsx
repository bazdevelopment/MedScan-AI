/* eslint-disable max-lines-per-function */
import { useColorScheme } from 'nativewind';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';

import { useClipboard } from '@/core/hooks/use-clipboard';
import { useShareLink } from '@/core/hooks/use-share-link';
import {
  colors,
  Modal,
  RoundedButton,
  ScrollView,
  Text,
  useModal,
  View,
} from '@/ui';
import { CopyLink, ShareIcon } from '@/ui/assets/icons';

import { Item } from './item';

export const ShareItem = () => {
  const modal = useModal();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const appLink = 'https://yourappstorelink.com';

  const iconColor = isDark ? colors.neutral[50] : colors.black;

  const { shareLink } = useShareLink();

  const { copiedText, isLoading, error, copyToClipboard } = useClipboard();

  return (
    <>
      <Item
        text="settings.share"
        icon={<ShareIcon color={iconColor} />}
        onPress={modal.present}
      />
      <Modal
        ref={modal.ref}
        index={0}
        snapPoints={['80%']}
        title="Share"
        backgroundStyle={{
          backgroundColor: isDark ? colors.blackBeauty : colors.primary[50],
        }}
      >
        <ScrollView className="flex-1 bg-gray-50 dark:bg-blackEerie">
          <View className="p-6">
            {/* Header Section */}
            <View className="mb-8 mt-2 items-center">
              <Text className="mb-2 font-bold-nunito text-3xl text-gray-800">
                Share X-Ray Analyzer App
              </Text>
              <Text className="mx-10 text-center text-base text-gray-600">
                Help others discover the power of AI-driven X-ray analysis
              </Text>
            </View>
            {/* QR Code Section */}
            <View className="mt-4 items-center">
              <QRCode
                value={appLink}
                size={225}
                color={colors.primary[900]}
                logo={require('../../../assets/icon-transparent.png')}
                logoMargin={5}
                logoSize={35}
                logoBorderRadius={10}
                backgroundColor={isDark ? colors.blackBeauty : colors.white}
                logoBackgroundColor="transparent"
              />
              <Text className="mt-10 text-center font-bold-nunito text-gray-700">
                Scan to download the app
              </Text>
              <Text className="mt-2 text-center text-sm text-gray-600">
                or share via your favorite platform
              </Text>
            </View>

            <View className="mt-16 flex-row justify-center gap-12">
              <RoundedButton
                icon={
                  <ShareIcon
                    width={26}
                    height={26}
                    color={isDark ? colors.white : colors.black}
                  />
                }
                label="Share"
                onPress={() =>
                  shareLink({ url: appLink, title: 'Share X-Ray Analyzer App' })
                }
                className="border-4 border-gray-300 bg-slate-100 dark:border-gray-500 dark:bg-blackBeauty"
                textClassName="text-sm dark:text-white"
              />

              <RoundedButton
                icon={
                  <CopyLink
                    width={26}
                    height={26}
                    color={isDark ? colors.white : colors.black}
                  />
                }
                label={
                  isLoading
                    ? 'Copying...'
                    : error
                      ? `Error: ${error.message}`
                      : `${copiedText ? 'Copied!' : 'Copy Link'}`
                }
                onPress={() => copyToClipboard(appLink)}
                className="border-4 border-gray-300 bg-slate-100 dark:border-gray-500 dark:bg-blackBeauty"
                textClassName="text-sm dark:text-white"
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};
