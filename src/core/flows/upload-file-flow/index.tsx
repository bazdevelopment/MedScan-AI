import React, { useState } from 'react';

import FlowModal from '@/components/flow-modal';
import { type IFlowModal } from '@/components/flow-modal/flow-modal.interface';
import FilePreviewScreen from '@/core/screens/file-preview-screen';
import GenerateReportScreen from '@/core/screens/generate-report-screen';
import UploadFileScreen from '@/core/screens/upload-file-screen';

const UploadFileFlow = ({ onSubmitCollectedData }: IFlowModal) => {
  const [collectedData, setCollectedData] = useState({});
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const handleGoToNextScreen = (newCollectedData: object) => {
    setCollectedData((prevCollectedData) => ({
      ...prevCollectedData,
      ...newCollectedData,
    }));
    setCurrentScreenIndex((prevIndex) => prevIndex + 1);
  };

  const handleGoToPreviousScreen = () =>
    setCurrentScreenIndex((prevIndex) => prevIndex - 1);

  const handleOnFinishFlow = () => {
    onSubmitCollectedData(collectedData);
  };
  return (
    <FlowModal
      currentScreenIndex={currentScreenIndex}
      onGoNext={handleGoToNextScreen}
      onGoBack={handleGoToPreviousScreen}
      onFinish={handleOnFinishFlow}
      collectedData={collectedData}
    >
      <UploadFileScreen />
      <FilePreviewScreen />
      <GenerateReportScreen />
    </FlowModal>
  );
};

export default UploadFileFlow;
