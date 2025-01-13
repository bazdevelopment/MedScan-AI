/* eslint-disable max-lines-per-function */
import { router, Stack } from 'expo-router';
import { firebaseAuth } from 'firebase/config';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

import { useAnalyzeImage, useAnalyzeVideo } from '@/api/image/image.hooks';
import { useDecrementScans } from '@/api/user/user.hooks';
import CustomHeader from '@/components/cusom-header';
import CustomModal from '@/components/custom-modal';
import ScanningModal from '@/components/image-scanner-modal';
import ProgressBar from '@/components/progress-bar';
import PromptSection from '@/components/prompt-section';
import VideoPlayer from '@/components/video';
import { useModal } from '@/core/hooks/use-modal';
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
  currentScreenIndex,
  totalSteps,
  onGoBack,
}: IFilePreviewScreen) => {
  const [promptMessage, setPromptMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { isVisible: isMediaModalVisible, closeModal, openModal } = useModal();

  const { mutate: onDecrementScans } = useDecrementScans();
  const {
    i18n: { language },
  } = useTranslation();

  const onSuccess = ({
    interpretationResult,
    promptMessage,
    createdDate,
  }: {
    interpretationResult: string;
    promptMessage: string;
    createdDate: string;
  }) => {
    interpretationResult &&
      router.push({
        pathname: '/generate-report',
        params: { interpretationResult, promptMessage, createdDate },
      });
    setIsModalVisible(false);
    onDecrementScans({ language });
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

  return (
    <KeyboardStickyView offset={{ opened: 100 }}>
      <Stack.Screen
        options={{
          header: (props) => (
            <CustomHeader
              {...props}
              title={'Upload Scan'}
              className="bg-white pt-20"
              titlePosition="center"
              onGoBack={onGoBack}
            />
          ),
        }}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="dark:bg-black">
          <ProgressBar
            currentStep={currentScreenIndex}
            totalSteps={totalSteps}
            isTextShown
            className="mt-8 flex-row self-center"
          />
        </View>

        <View className="px-6 pt-10 dark:bg-black">
          <View className=" w-full rounded-[25px] border-4 border-primary-300">
            {isVideo ? (
              <VideoPlayer
                videoSource={collectedData.fileUri as string}
                onTapToView={openModal}
              />
            ) : (
              <Image
                className="z-1 h-[200px] w-full rounded-[23px]"
                source={{
                  uri: collectedData.fileBase64
                    ? getBase64ImageUri(collectedData.fileBase64)
                    : (collectedData.fileUri as string),
                }}
                contentFit="cover"
                onTapToView={openModal}
              />
            )}

            <View className="dark:bg-blackEerie top-[-35px] z-[-1] mb-[-35px] flex-row justify-between rounded-[22px] border-primary-700 bg-primary-900 px-4 pb-3 pt-[45px]">
              <Text className="font-semibold-nunito text-sm text-white">
                {collectedData.fileExtension}
              </Text>
              <Text className="font-semibold-nunito text-sm text-white">
                Today
              </Text>
            </View>
          </View>
        </View>
        <View className="mx-4 mt-4 rounded-t-3xl ">
          <PromptSection
            promptMessage={promptMessage}
            onUpdatePromptMessage={handleUpdatePromptMessage}
          />
        </View>

        <Button
          iconPosition="right"
          label="Generate report"
          className="mt-10 h-[62px] w-[90%] gap-2 self-center rounded-full bg-primary-900 dark:bg-primary-900"
          textClassName="text-lg font-semibold-nunito text-white dark:text-white"
          size="lg"
          onPress={() => {
            setIsModalVisible(true);
            onAnalyze();
          }}
          icon={<WandSparkle width={25} height={25} color={colors.white} />}
        />
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

        {/* Modal */}
        <CustomModal visible={isMediaModalVisible} onClose={closeModal}>
          {isVideo ? (
            <View className="w-full">
              <VideoPlayer videoSource={{ uri: collectedData.fileUri }} />
            </View>
          ) : (
            <View className="h-[430px] w-full">
              <Image
                source={{
                  uri: collectedData.fileBase64
                    ? getBase64ImageUri(collectedData.fileBase64)
                    : (collectedData.fileUri as string),
                }}
                className="h-full w-full rounded-lg"
              />
            </View>
          )}
        </CustomModal>
      </ScrollView>
    </KeyboardStickyView>
  );
};

export default FilePreviewScreen;
