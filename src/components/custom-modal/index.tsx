import { BlurView } from 'expo-blur';
import React from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';

import { colors, Text } from '@/ui';
import { CloseIcon } from '@/ui/assets/icons';

import Icon from '../icon';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  overlayOpacity?: number;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  children,
  title,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Modal Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <BlurView
          intensity={50}
          className="flex-1"
          tint="dark"
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <View className=" h-14 w-11/12 flex-row items-center justify-between rounded-t-xl bg-primary-900 px-5">
            <Text className="font-medium-nunito text-lg text-white">
              {title || ''}
            </Text>

            <View className="flex-row">
              <Icon
                icon={<CloseIcon />}
                color={colors.primary[900]}
                size={16}
                containerStyle="bg-white rounded-full p-1"
                onPress={onClose}
              />
            </View>
          </View>
          {/* Modal Content,TouchableWithoutFeedback without on press to not trigger dismiss function when pressing on the content  */}
          <TouchableWithoutFeedback>
            <View className="w-11/12 rounded-b-xl bg-white p-5 dark:bg-black">
              {children}
            </View>
          </TouchableWithoutFeedback>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;
