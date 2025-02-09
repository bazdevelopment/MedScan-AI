/* eslint-disable max-lines-per-function */
import {
  type BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';

import CustomHeader from '@/components/cusom-header';
import ProgressBar from '@/components/progress-bar';
import { MEDIA_PICKER } from '@/constants/media-picker';
import { useMediaPiker } from '@/core/hooks/use-media-picker';
import { translate } from '@/core/i18n';
import { Button, colors, Modal, RoundedButton, Text, useModal } from '@/ui';
import { Camera, Gallery, PaperClip } from '@/ui/assets/icons';
import HorizontalLine from '@/ui/horizontal-line';

import {
  type IUploadFileOptions,
  type IUploadFileScreen,
} from './upload-file-screen.interface';

const UploadFileScreen = ({
  goToNextScreen,
  totalSteps,
  currentScreenIndex,
  onGoBack,
  resetFlow,
}: IUploadFileScreen) => {
  const modal = useModal();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { onChooseImageFromGallery, onChooseFromFiles, onTakePhoto } =
    useMediaPiker({ onUploadFinished: goToNextScreen });

  const onSelectFileUploadMethod = (method: string) => {
    if (method.includes(MEDIA_PICKER.GALLERY)) {
      onChooseImageFromGallery();
    } else {
      onChooseFromFiles();
    }
    modal.dismiss();
  };

  const galleryOptions = [
    {
      label: MEDIA_PICKER.GALLERY, //do not translate this,
      title: translate('general.gallery'),
      id: 1,
      icon: <Gallery width={27} height={27} color={colors.primary[900]} />,
    },
    {
      label: MEDIA_PICKER.FILES, //do not translate this
      title: translate('general.files'),
      id: 2,
      icon: <PaperClip width={27} height={27} color={colors.primary[900]} />,
    },
  ];

  useEffect(() => {
    resetFlow();
  }, []);
  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <CustomHeader
              {...props}
              title={translate('uploadScan.title')}
              className="bg-white pt-20"
              titlePosition="center"
              onGoBack={onGoBack}
              backIconColor={isDark ? colors.white : colors.blackBeauty}
            />
          ),
        }}
      />

      <ProgressBar
        currentStep={currentScreenIndex + 1}
        totalSteps={totalSteps}
        isTextShown
        className="mt-8 flex-row self-center"
      />

      <View className="mt-4">
        <Text className="mx-8 mb-12 mt-8 font-bold-nunito text-[32px]">
          {translate('flows.createReport.uploadFile.title')}
        </Text>

        <TouchableOpacity
          className="mx-8 flex-col items-center justify-center rounded-3xl border-4 border-primary-900 py-6"
          onPress={modal.present}
        >
          <Gallery color={colors.primary[900]} width={32} height={42} top={1} />
          <View className="mt-4">
            <Text className="text-center font-bold-nunito text-primary-900">
              {translate('flows.createReport.uploadFile.location')}
            </Text>
            <Text className="mt-1 text-center text-base text-gray-600">
              {translate('flows.createReport.uploadFile.size')}
            </Text>
            <Text className="mt-2 text-center font-bold-nunito text-sm text-primary-700">
              {translate('flows.createReport.uploadFile.scanType')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <HorizontalLine text="or" className="my-16" />

      <Button
        label={translate('flows.createReport.uploadFile.openCamera')}
        className="h-[62px] w-[90%] gap-5 self-center rounded-full bg-primary-100 dark:bg-primary-900"
        textClassName="text-lg font-semibold-nunito text-primary-900 dark:text-white"
        icon={
          <Camera
            width={28}
            height={28}
            fill={isDark ? colors.white : colors.primary[900]}
          />
        }
        onPress={onTakePhoto}
        iconPosition="left"
      />

      <UploadFileOptionsModal
        options={galleryOptions}
        testID="Upload file options id"
        onSelect={onSelectFileUploadMethod}
        ref={modal.ref}
        heading={translate('components.UploadFileOptionsModal.heading')}
      />
    </>
  );
};

export default UploadFileScreen;

export const UploadFileOptionsModal = React.forwardRef<
  BottomSheetModal,
  IUploadFileOptions
>(({ options, onSelect, testID, heading }, ref) => {
  const height = 230;
  const snapPoints = React.useMemo(() => [height], [height]);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <BottomSheetModalProvider>
      <Modal
        ref={ref}
        index={0}
        title={heading}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: isDark ? colors.neutral[800] : colors.white,
        }}
      >
        <View className="mt-4 flex-row justify-center gap-10" testID={testID}>
          {options.map((option) => (
            <RoundedButton
              icon={option.icon}
              key={option.id}
              label={option.title}
              onPress={() => onSelect(option.label)}
              textClassName="dark:text-white"
            />
          ))}
        </View>
      </Modal>
    </BottomSheetModalProvider>
  );
});
