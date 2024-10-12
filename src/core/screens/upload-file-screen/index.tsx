import {
  type BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useMediaPiker } from '@/core/hooks/use-media-picker';
import { Button, colors, Modal, Text, useModal } from '@/ui';
import { Camera, Gallery, PaperClip } from '@/ui/assets/icons';
import { UploadFilesIllustration } from '@/ui/assets/illustrations';
import HorizontalLine from '@/ui/horizontal-line';

import { type IUploadFileOptions } from './upload-file-screen.interface';

const UploadFileScreen = () => {
  const modal = useModal();

  const { onChooseImageFromGallery, onChooseFromFiles, onTakePhoto } =
    useMediaPiker();

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
      <View className="bg-primary-300">
        <View className="flex-row justify-center pt-10">
          <UploadFilesIllustration width={300} height={200} />
        </View>
        <Text className="text-center text-xl font-bold text-white">
          You need to upload your X-RAY / CT
        </Text>
        <Text className="text-center text-sm text-white">
          Maximum file size: 10MB
        </Text>

        <Button
          label="Open camera & take picture"
          className="top-6 mb-0 mt-4 w-[70%] self-center rounded-full"
          size="lg"
          textClassName="text-md"
          icon={<Camera color={colors.white} />}
          onPress={onTakePhoto}
        />
      </View>

      <HorizontalLine text="or" className="my-14" />
      <TouchableOpacity
        className="mx-10 h-20 flex-row items-center justify-center gap-3 rounded-xl border border-slate-100"
        onPress={modal.present}
      >
        <Gallery color={colors.primary[300]} width={32} height={42} top={1} />
        <View>
          <Text className="font-bold text-primary-300">
            Select from Gallery or Files
          </Text>
          <Text className="-mt-1 text-sm text-gray-400">
            PNG, JPG, PDF, or MP4
          </Text>
        </View>
      </TouchableOpacity>
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
  { label: 'Files', id: 2, icon: <PaperClip width={27} height={27} /> },
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
