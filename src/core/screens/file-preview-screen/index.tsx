/* eslint-disable max-lines-per-function */
import { firebaseAuth } from 'firebase/config';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

import { useAnalyzeImage, useAnalyzeVideo } from '@/api/image/image.hooks';
import { useDecrementScans } from '@/api/user/user.hooks';
import GradientText from '@/components/gradient-text';
import ScanningModal from '@/components/image-scanner-modal';
import PromptSection from '@/components/prompt-section';
import VideoPlayer from '@/components/video';
import { checkIsVideo } from '@/core/utilities/check-is-video';
import { getBase64ImageUri } from '@/core/utilities/get-base64-uri';
import { Button, colors, Image, Text } from '@/ui';
import { WandSparkle } from '@/ui/assets/icons';

import { type IFilePreviewScreen } from './file-preview-screen.interface';

const createFormDataVidePayload = ({
  fileUri,
  fileName,
  fileMimeType,
  userId,
  promptMessage,
}: {
  fileUri: string;
  fileName: string;
  fileMimeType: string;
  userId: string;
  promptMessage: string;
}) => {
  const formData = new FormData();
  // @ts-expect-error: special react native format for form data
  formData.append('video', {
    uri: fileUri,
    name: fileName ?? fileUri.split('/').pop(),
    type: fileMimeType,
  });

  formData.append('userId', userId);
  formData.append('promptMessage', promptMessage);

  return formData;
};

const createFormDataImagePayload = ({
  fileUri,
  fileName,
  fileMimeType,
  userId,
  promptMessage,
}: {
  fileUri: string;
  fileName: string;
  fileMimeType: string;
  userId: string;
  promptMessage: string;
}) => {
  const formData = new FormData();
  // @ts-expect-error: special react native format for form data
  formData.append('image', {
    uri: fileUri,
    name: fileName ?? fileUri.split('/').pop(),
    type: fileMimeType,
  });

  formData.append('userId', userId);
  formData.append('promptMessage', promptMessage);

  return formData;
};

const FilePreviewScreen = ({
  collectedData,
  goToNextScreen,
}: IFilePreviewScreen) => {
  const [promptMessage, setPromptMessage] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { mutate: onDecrementScans } = useDecrementScans();
  const {
    i18n: { language },
  } = useTranslation();
  const onSuccess = ({
    interpretationResult,
  }: {
    interpretationResult: string;
  }) => {
    goToNextScreen({ interpretationResult });
    onDecrementScans();
  };

  //todo: to be changed in the future with useUser hook
  const userId = firebaseAuth.currentUser?.uid as string;

  const videoPayload = createFormDataVidePayload({
    fileUri: collectedData.fileUri as string,
    fileName: collectedData.fileName as string,
    fileMimeType: collectedData.fileMimeType as string,
    promptMessage,
    userId,
  });

  const imagePayload = createFormDataImagePayload({
    fileUri: collectedData.fileUri as string,
    fileName: collectedData.fileName as string,
    fileMimeType: collectedData.fileMimeType as string,
    promptMessage: promptMessage,
    userId,
  });

  const isVideo = checkIsVideo(collectedData.fileExtension!);

  const {
    mutate: handleAnalyzeImageUsingAi,
    error: errorAnalyzeImage,
    isPending: isPendingAnalyzeImage,
  } = useAnalyzeImage({ onSuccessCallback: onSuccess, language });

  const {
    mutate: handleAnalyzeVideoUsingAI,
    error: errorAnalyzeVideo,
    isPending: isPendingAnalyzeVideo,
  } = useAnalyzeVideo({ onSuccessCallback: onSuccess, language });

  const onAnalyze = () => {
    if (isVideo) {
      handleAnalyzeVideoUsingAI(videoPayload);
    } else {
      handleAnalyzeImageUsingAi(imagePayload);
    }
  };

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
          <View className="w-full self-center rounded-xl">
            {isVideo ? (
              <VideoPlayer videoSource={collectedData.fileUri as string} />
            ) : (
              <Image
                className="h-[150px] rounded-t-xl"
                source={{
                  uri: collectedData.fileBase64
                    ? getBase64ImageUri(collectedData.fileBase64)
                    : (collectedData.fileUri as string),
                }}
                contentFit="cover"
              />
            )}

            <View className="space-between flex-row items-end rounded-b-xl bg-slate-100 p-4 dark:bg-charcoal-900">
              <View className="flex-1">
                <Text className="font-regular">Uploaded: 01:022 2020-22</Text>
                <Text className="font-regular text-slate-500">Today</Text>
              </View>
              <Text className="font-regular text-sm text-slate-500">
                {collectedData.fileExtension}
              </Text>
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
            onPress={() => {
              setIsModalVisible(true);
              onAnalyze();
            }}
            withGradientText
            icon={<WandSparkle width={20} height={20} withLinearGradient />}
          />
        </View>
      </ScrollView>
      {isModalVisible && (
        <ScanningModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          filePath={
            isVideo
              ? collectedData.fileUri
              : collectedData.fileBase64
                ? getBase64ImageUri(collectedData.fileBase64)
                : (collectedData.fileUri as string)
          }
          isVideo={isVideo}
          error={errorAnalyzeImage || errorAnalyzeVideo}
          isPending={isPendingAnalyzeImage || isPendingAnalyzeVideo}
          onRetry={onAnalyze}
        />
      )}
    </KeyboardStickyView>
  );
};

export default FilePreviewScreen;
