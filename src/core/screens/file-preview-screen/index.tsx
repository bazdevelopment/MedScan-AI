/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import { firebaseAuth } from 'firebase/config';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Keyboard,
  Modal as RNModal,
  ScrollView,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import { Toaster } from 'sonner-native';

import { useAnalyzeImage, useAnalyzeVideo } from '@/api/image/image.hooks';
import AttachmentPreview from '@/components/attachment-preview';
import ImageAnnotationStudio from '@/components/image-annotation-studio';
import ScanningModal from '@/components/image-scanner-modal';
import OpenStudioSection from '@/components/open-studio-section';
import ProgressBar from '@/components/progress-bar';
import PromptSection from '@/components/prompt-section';
import { translate } from '@/core/i18n';
import { checkIsVideo } from '@/core/utilities/check-is-video';
import { DEVICE_TYPE } from '@/core/utilities/device-type';
import { getBase64ImageUri } from '@/core/utilities/get-base64-uri';
import { wait } from '@/core/utilities/wait';
import { Button, colors } from '@/ui';
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
  highlightedRegions,
}: {
  fileUri: string;
  fileName: string;
  fileMimeType: string;
  userId: string;
  highlightedRegions: string;
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
  formData.append('highlightedRegions', highlightedRegions);

  return formData;
};

const FilePreviewScreen = ({
  collectedData,
  currentScreenIndex,
  totalSteps,
  resetFlow,
}: IFilePreviewScreen) => {
  const [promptMessage, setPromptMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [squares, setSquares] = useState([]);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const originalImage = collectedData.fileUri;
  const [imageUrlHighlighted, setImageUrlHighlighted] = useState(originalImage);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const onUpdateImageUrlHighlighted = (newImageUrl: string) => {
    setImageUrlHighlighted(newImageUrl);
  };

  const handleOpenStudio = () => setIsStudioOpen(true);
  const handleCloseStudio = () => setIsStudioOpen(false);
  const handleCloseScanningModal = () => setIsModalVisible(false);

  const addSquare = () => {
    const width = 80 + Math.random() * 120; // 80-200px width
    const height = 80 + Math.random() * 120; // 80-200px height

    const newSquare = {
      id: Date.now(),
      x: (screenWidth - width) / 2.5, // Center horizontally
      y: (screenHeight - height) / 2.5, // Center vertically
      width: width,
      height: height,
    };
    setSquares((prev) => [...prev, newSquare]);
  };

  const removeSquare = (id: string) => {
    setSquares((prev) => prev.filter((h) => h.id !== id));
  };
  // const { mutate: onDecrementScans } = useDecrementScans();
  const {
    i18n: { language },
  } = useTranslation();

  //todo: to be changed in the future with useUser hook
  const userId = firebaseAuth.currentUser?.uid as string;

  const videoPayload = createFormDataVidePayload({
    fileUri: imageUrlHighlighted as string,
    fileName: collectedData.fileName as string,
    fileMimeType: collectedData.fileMimeType as string,
    promptMessage,
    userId,
  });

  const imagePayload = createFormDataImagePayload({
    fileUri: imageUrlHighlighted as string,
    fileName: collectedData.fileName as string,
    fileMimeType: collectedData.fileMimeType as string,
    promptMessage: promptMessage,
    highlightedRegions: squares?.length?.toString(),
    userId,
  });

  const isVideo = checkIsVideo(collectedData.fileExtension!);

  const mediaSource = Boolean(collectedData.fileBase64)
    ? getBase64ImageUri(collectedData.fileBase64 as string)
    : imageUrlHighlighted;

  const onSuccess = ({ conversationId }: { conversationId: string }) => {
    router.navigate({
      pathname: '/chat-screen',
      params: {
        conversationId,
        mediaSource,
        mimeType: collectedData.fileMimeType,
        conversationMode: 'IMAGE_SCAN_CONVERSATION',
      },
    });
    setIsModalVisible(false);
    wait(1000).then(() => resetFlow());
  };

  const {
    mutate: handleAnalyzeImageUsingAi,
    error: errorAnalyzeImage,
    isPending: isPendingAnalyzeImage,
  } = useAnalyzeImage({
    onSuccessCallback: onSuccess,
    language,
    handleCloseScanningModal,
    resetFlow,
  });

  const {
    mutate: handleAnalyzeVideoUsingAI,
    error: errorAnalyzeVideo,
    isPending: isPendingAnalyzeVideo,
  } = useAnalyzeVideo({
    onSuccessCallback: onSuccess,
    language,
    handleCloseScanningModal,
    resetFlow,
  });

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
      {DEVICE_TYPE.IOS && (
        <Toaster autoWiggleOnUpdate="toast-change" pauseWhenPageIsHidden />
      )}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="dark:bg-black">
          <ProgressBar
            currentStep={currentScreenIndex + 1}
            totalSteps={totalSteps}
            isTextShown
            className="mt-8 flex-row self-center"
          />
        </View>

        <View className="px-6 pt-10 dark:bg-black">
          <AttachmentPreview
            filePath={mediaSource as string}
            fileMimeType={collectedData.fileMimeType as string}
            isVideo={isVideo}
            additionalImageStyles="h-[120px]"
            additionalVideoStyles={{
              height: 120,
              width: '100%',
              borderRadius: 20,
            }}
          />
        </View>
        {!isVideo && (
          <OpenStudioSection
            squares={squares}
            onOpenStudio={handleOpenStudio}
          />
        )}
        <View className="mx-4 mt-4 rounded-t-3xl ">
          <PromptSection
            promptMessage={promptMessage}
            onUpdatePromptMessage={handleUpdatePromptMessage}
          />
        </View>

        {isStudioOpen && (
          <RNModal
            visible={isStudioOpen}
            transparent
            animationType="fade"
            onRequestClose={handleCloseStudio} // Android back button support
          >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ImageAnnotationStudio
                closeTool={handleCloseStudio}
                onUpdateImageUrlHighlighted={onUpdateImageUrlHighlighted}
                imageUri={originalImage}
                squares={squares}
                addSquare={addSquare}
                removeSquare={removeSquare}
              />
            </GestureHandlerRootView>
          </RNModal>
        )}

        <Button
          iconPosition="right"
          label={translate(
            'rootLayout.screens.filePreviewScreen.generateReportButton',
          )}
          className="mt-10 h-[62px] w-[90%] gap-2 self-center rounded-full bg-primary-900 active:bg-primary-700 dark:bg-primary-900"
          textClassName="text-lg font-semibold-nunito text-white dark:text-white"
          size="lg"
          onPress={() => {
            setIsModalVisible(true);
            Keyboard.dismiss();
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
                  : (imageUrlHighlighted as string)
            }
            isVideo={isVideo}
            error={errorAnalyzeImage || errorAnalyzeVideo}
            isPending={isPendingAnalyzeImage || isPendingAnalyzeVideo}
            onRetry={onAnalyze}
          />
        )}
      </ScrollView>
    </KeyboardStickyView>
  );
};

export default FilePreviewScreen;
