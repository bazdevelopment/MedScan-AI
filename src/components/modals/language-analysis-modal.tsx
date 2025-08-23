import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useRef } from 'react';

import { translate } from '@/core';
import { colors, Modal } from '@/ui';

import LanguageAnalysisContent from '../language-analysis-content';

interface ILanguageModal {
  selectedLanguage: string;
  onLanguageSelect: (languageCode: string) => void;
}

const LanguageModal = React.forwardRef<BottomSheetModal, ILanguageModal>(
  ({ selectedLanguage, onLanguageSelect }, ref) => {
    const modalRef = useRef<BottomSheetModal>(null);
    React.useImperativeHandle(ref, () => modalRef.current as BottomSheetModal);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const height = '90%';
    const snapPoints = React.useMemo(() => [height, '100%'], [height]);

    const handleClose = useCallback(() => {
      modalRef.current?.dismiss();
    }, []);

    return (
      <Modal
        ref={modalRef}
        snapPoints={snapPoints}
        title={translate(
          'rootLayout.screens.languageAnalysisModal.languageSelection',
        )}
        backgroundStyle={{
          backgroundColor: isDark ? colors.blackEerie : colors.white,
        }}
      >
        <LanguageAnalysisContent
          selectedLanguage={selectedLanguage}
          onLanguageSelect={onLanguageSelect}
          onClose={handleClose}
        />
      </Modal>
    );
  },
);

LanguageModal.displayName = 'LanguageModal';

export default LanguageModal;
