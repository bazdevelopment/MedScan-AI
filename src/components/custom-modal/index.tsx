import React from 'react';
import { Modal, View } from 'react-native';

import { translate } from '@/core';
import { Button, colors } from '@/ui';
import { CloseIcon } from '@/ui/assets/icons';

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
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Modal Overlay */}
      <View className="flex-1 items-center justify-center bg-black">
        {/* Modal Content */}
        <View className="w-11/12 rounded-lg bg-white p-4">
          {children}

          {/* Close Button */}
          <Button
            label={translate('general.close')}
            variant="outline"
            icon={<CloseIcon color={colors.black} width={20} height={20} />}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
