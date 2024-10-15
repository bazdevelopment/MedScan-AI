/* eslint-disable max-lines-per-function */
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Image, Modal, View } from 'react-native';

import { Button } from '@/ui';

import { type IImageScannerModal } from './image-scanner-modal.interface';
import { imageScannerModalStyles } from './image-scanner-modal.styles';

const ImageScannerModal = ({
  visible,
  onClose,
  imagePath,
  goToNextScreen,
}: IImageScannerModal) => {
  const [isScanning, setIsScanning] = useState(false);
  const [showRetry, setShowRetry] = useState(false);

  // Simulating a request
  const handleScan = () => {
    setShowRetry(false);
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      setShowRetry(true);
      // handle function to move to the next screen
      goToNextScreen();
    }, 5000);
  };

  useEffect(() => {
    handleScan();
  }, []);

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
              source={{ uri: imagePath }}
              className="h-[300px] w-[300px] rounded-xl"
              resizeMode="cover"
            />

            {isScanning && (
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
            {showRetry && (
              <Button
                label="Retry"
                onPress={handleScan}
                disabled={isScanning}
              />
            )}
            <Button label="Close" onPress={onClose} disabled={isScanning} />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default ImageScannerModal;
