/* eslint-disable max-lines-per-function */
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Image, Modal, View } from 'react-native';

import { LOADING_MESSAGES_IMAGE_SCANNING } from '@/constants/loading-messages';
import { translate } from '@/core';
import { Button, colors, Text } from '@/ui';
import { CloseIcon, RetryIcon } from '@/ui/assets/icons';

import BounceLoader from '../bounce-loader';
import VideoPlayer from '../video';
import { type IImageScannerModal } from './image-scanner-modal.interface';
import { imageScannerModalStyles } from './image-scanner-modal.styles';

const ScanningModal = ({
  visible,
  onClose,
  filePath,
  error,
  isPending,
  onRetry,
  isVideo,
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
            {isVideo ? (
              <View className="h-[300px] w-[300px]">
                <VideoPlayer videoSource={filePath as string} />
              </View>
            ) : (
              <Image
                source={{
                  uri: filePath as string,
                }}
                className="h-[300px] w-[300px] rounded-xl"
                resizeMode="cover"
              />
            )}

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
          {isPending && (
            <BounceLoader
              className="mt-10"
              loadingMessages={LOADING_MESSAGES_IMAGE_SCANNING}
            />
          )}
          <View className="mt-10 flex-row justify-center gap-5">
            {!!error && (
              <Button
                label={translate('general.retry')}
                onPress={onRetry}
                disabled={isPending}
                icon={<RetryIcon color={colors.white} width={18} height={18} />}
              />
            )}
            <Button
              label={translate('general.close')}
              onPress={onClose}
              disabled={isPending}
              icon={<CloseIcon color={colors.white} width={18} height={18} />}
            />
            {!!error && <Text>{error.toString()}</Text>}
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default ScanningModal;
