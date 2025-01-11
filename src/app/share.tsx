/* eslint-disable max-lines-per-function */
import * as Sharing from 'expo-sharing';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Button, colors } from '@/ui';
import { ShareIcon } from '@/ui/assets/icons';

const ShareScreen = () => {
  const appLink = 'https://yourappstorelink.com';

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="min-h-screen p-6">
        {/* Header Section */}
        <View className="mb-8 items-center">
          <Text className="mb-2 font-bold-nunito text-3xl text-gray-800">
            Share X-Ray Analyzer
          </Text>
          <Text className="text-center text-base text-gray-600">
            Help others discover the power of AI-driven X-ray analysis
          </Text>
        </View>
        {/* QR Code Section */}
        <View className="mb-8 items-center rounded-2xl bg-white p-6 shadow-md">
          <QRCode
            value={appLink}
            size={250}
            color={colors.primary[900]}
            backgroundColor={colors.white}
            logo={require('../../assets/icon-transparent.png')}
            logoMargin={5}
            logoSize={35}
            logoBorderRadius={10}
            logoBackgroundColor="transparent"
          />
          <Text className="mt-4 text-center font-medium text-gray-700">
            Scan to download the app
          </Text>
          <Text className="mt-2 text-center text-sm text-gray-500">
            Or share via your favorite platform
          </Text>
        </View>

        <Button
          className="mt-4 self-center"
          variant="default"
          icon={<ShareIcon width={24} height={24} color={colors.white} />}
          label="Share with other apps"
          onPress={() =>
            Sharing.shareAsync(appLink, {
              dialogTitle: 'Share X-Ray Analyzer App',
            })
          }
        />
      </View>
    </ScrollView>
  );
};

export default ShareScreen;
