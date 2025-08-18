import { router } from 'expo-router';
import React, { useState } from 'react';

import FlowModal from '@/components/flow-modal';
import FreeTrialPreview from '@/core/screens/free-trial-preview';

export interface IOnboardingCollectedData {
  preferredName: string;
}

export default function Onboarding() {
  const [collectedData, setCollectedData] = useState<IOnboardingCollectedData>({
    preferredName: '',
  });
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const onSubmitCollectedData = async (
    _collectedData: IOnboardingCollectedData,
  ) => {};

  const handleGoToNextScreen = (newCollectedData: IOnboardingCollectedData) => {
    setCollectedData((prevCollectedData) => ({
      ...prevCollectedData,
      ...newCollectedData,
    }));
    setCurrentScreenIndex((prevIndex) => prevIndex + 1);
  };

  const handleGoToPreviousScreen = () =>
    setCurrentScreenIndex((prevIndex) => prevIndex - 1);

  const handleOnFinishFlow = (newCollectedData) => {
    setCollectedData((prevCollectedData) => ({
      ...prevCollectedData,
      ...newCollectedData,
    }));
    onSubmitCollectedData({ ...collectedData, ...newCollectedData });
  };

  const onSkip = () => {
    /**Navigate to the onboarding */
    // setCurrentScreenIndex(1);
    router.navigate({
      pathname: '/paywall-new',
      params: { allowAppAccess: true },
    });
  };

  return (
    <FlowModal
      currentScreenIndex={currentScreenIndex}
      onGoNext={handleGoToNextScreen}
      onFinish={handleOnFinishFlow}
      onGoBack={handleGoToPreviousScreen}
      collectedData={collectedData}
      onSkip={onSkip}
    >
      <FreeTrialPreview />
      {/* <PaywallOnboarding /> */}
    </FlowModal>
  );
}
