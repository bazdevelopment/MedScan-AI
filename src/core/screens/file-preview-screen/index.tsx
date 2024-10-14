/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

import GradientText from '@/components/gradient-text';
import ImageScannerModal from '@/components/image-scanner-modal';
import PromptSection from '@/components/prompt-section';
import { Button, colors, Image, Text } from '@/ui';
import { WandSparkle } from '@/ui/assets/icons';

import { type IFilePreviewScreen } from './file-preview-screen.interface';

const FilePreviewScreen = ({
  collectedData,
  goToNextScreen,
}: IFilePreviewScreen) => {
  const [promptMessage, setPromptMessage] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleUpdatePromptMessage = (message: string) => {
    setPromptMessage(message);
  };
  const handleUpdateAdditionalInfo = (message: string) => {
    setAdditionalInfo(message);
  };

  return (
    <KeyboardStickyView className="flex-1">
      <ScrollView bounces={false}>
        <View className="bg-primary-300 px-10 pb-14 pt-10 dark:bg-black">
          <View className="w-[90%] self-center rounded-xl">
            <Image
              className="h-[150px] rounded-t-xl"
              source={collectedData.file}
              contentFit="cover"
            />
            <View className="space-between flex-row items-end rounded-b-xl bg-slate-100 p-4 dark:bg-charcoal-900">
              <View className="flex-1">
                <Text className="font-regular">Uploaded: 01:022 2020-22</Text>
                <Text className="font-regular text-slate-500">Today</Text>
              </View>
              <Text className="font-regular text-sm text-slate-500">JPG</Text>
            </View>
          </View>
        </View>
        <View className="top-[-25px] mt-2 h-full rounded-t-[20px] bg-slate-100 dark:bg-charcoal-900">
          <GradientText
            colors={[colors.lightSkyBlue, colors.primaryPurple]}
            className="py-2 text-center text-sm font-bold"
          >
            Great! Now we need more information!
          </GradientText>

          <PromptSection
            promptMessage={promptMessage}
            additionalInfo={additionalInfo}
            onUpdatePromptMessage={handleUpdatePromptMessage}
            onUpdateAdditionalInfo={handleUpdateAdditionalInfo}
          />

          <Button
            label="Generate report"
            className="bottom-0 mt-4 w-[70%] gap-2 self-center rounded-full bg-white dark:bg-black"
            size="lg"
            textClassName="text-md font-bold"
            //todo: add in this function the result of the scan, the scanning will be in this screen
            // onPress={() => goToNextScreen({ promptMessage, additionalInfo })}
            onPress={() => setIsModalVisible(true)}
            withGradientText
            icon={<WandSparkle width={20} height={20} withLinearGradient />}
          />
        </View>
      </ScrollView>

      <ImageScannerModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        imagePath={collectedData.file}
      />
    </KeyboardStickyView>
  );
};

export default FilePreviewScreen;
