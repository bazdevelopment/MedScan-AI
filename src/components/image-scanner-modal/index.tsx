import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Image, Modal, View } from 'react-native';

import { Button, Text } from '@/ui';

import { type IImageScannerModal } from './image-scanner-modal.interface';
import { imageScannerModalStyles } from './image-scanner-modal.styles';

const ImageScannerModal = ({
  visible,
  onClose,
  imagePath,
  error,
  isPending,
  onRetry,
}: IImageScannerModal) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView intensity={80} className="flex-1" tint="dark">
        <View className="flex-1 items-center justify-center">
          <View>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${imagePath}`,
              }}
              className="h-[300px] w-[300px] rounded-xl"
              resizeMode="cover"
            />

            {isPending && (
              <View className="absolute inset-0 items-center justify-center">
                <LottieView
                  source={require('assets/lottie/scan-animation.json')}
                  autoPlay
                  loop
                  style={imageScannerModalStyles.lottieView}
                />
              </View>
            )}
          </View>
          <View className="mt-10 flex-row justify-center gap-5">
            {!!error && (
              <Button label="Retry" onPress={onRetry} disabled={isPending} />
            )}
            <Button label="Close" onPress={onClose} disabled={isPending} />
            {!!error && <Text>{error.toString()}</Text>}
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default ImageScannerModal;
