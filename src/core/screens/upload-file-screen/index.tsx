/* eslint-disable max-lines-per-function */
import {
  type BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import CustomHeader from '@/components/cusom-header';
import ProgressBar from '@/components/progress-bar';
import { useMediaPiker } from '@/core/hooks/use-media-picker';
import { translate } from '@/core/i18n';
import { Button, colors, Modal, Text, useModal } from '@/ui';
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
}: IUploadFileScreen) => {
  const modal = useModal();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { onChooseImageFromGallery, onChooseFromFiles, onTakePhoto } =
    useMediaPiker({ onUploadFinished: goToNextScreen });

  const onSelectFileUploadMethod = (method: string) => {
    if (method.includes('Gallery')) {
      onChooseImageFromGallery();
    } else {
      onChooseFromFiles();
    }
    modal.dismiss();
  };

  return (
    <>
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

      <ProgressBar
        currentStep={currentScreenIndex}
        totalSteps={totalSteps}
        isTextShown
        className="mt-8 flex-row self-center"
      />

      <View className="mt-4">
        <Text className="mx-8 mb-12 mt-8 font-bold-nunito text-[32px]">
          {translate('flows.createReport.uploadFile.title')}
        </Text>

        <TouchableOpacity
          className="flex-col mx-8 items-center justify-center rounded-3xl border-4 border-primary-900 py-6"
          onPress={modal.present}
        >
          <Gallery color={colors.primary[900]} width={32} height={42} top={1} />
          <View className="mt-4">
            <Text className="font-bold-nunito text-primary-900">
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
        className="h-[62px] w-[90%]  gap-5 self-center rounded-full bg-primary-100 dark:bg-primary-900"
        textClassName="text-lg font-semibold-nunito text-primary-900 dark:text-white"
        icon={
          <Camera
            width={28}
            height={28}
            color={isDark ? colors.white : colors.primary[900]}
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
      />
    </>
  );
};

export default UploadFileScreen;

const galleryOptions = [
  {
    label: 'Gallery',
    id: 1,
    icon: <Gallery width={27} height={27} />,
  },
  {
    label: 'Files',
    id: 2,
    icon: <PaperClip width={27} height={27} />,
  },
];

export const UploadFileOptionsModal = React.forwardRef<
  BottomSheetModal,
  IUploadFileOptions
>(({ options, onSelect, testID }, ref) => {
  const height = 200;
  const snapPoints = React.useMemo(() => [height], [height]);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <BottomSheetModalProvider>
      <Modal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: isDark ? colors.neutral[800] : colors.white,
        }}
      >
        <View className="mt-2 flex-row justify-center gap-10" testID={testID}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              className="h-[100px] w-[120px] items-center justify-center gap-3 rounded-2xl bg-slate-50 dark:bg-black"
              onPress={() => onSelect(option.label)}
            >
              {option.icon}
              <Text className="text-center">{option.label} </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </BottomSheetModalProvider>
  );
});
