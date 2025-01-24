import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import FlowModal from '@/components/flow-modal';
import { useIsFirstTime } from '@/core/hooks';
import { useIsOnboarded } from '@/core/hooks/use-is-onboarded';
import FreeTrialPreview from '@/core/screens/free-trial-preview';
import NamePreferenceScreen from '@/core/screens/name-preference-screen';
import Paywall from '@/core/screens/paywall';

interface IOnboardingCollectedData {
  preferredName: string;
  selectedPackage: string;
}

export default function Onboarding() {
  const [, setIsFirstTime] = useIsFirstTime();
  const [, setIsOnboarded] = useIsOnboarded();

  const router = useRouter();

  const [collectedData, setCollectedData] = useState<IOnboardingCollectedData>({
    preferredName: '',
    selectedPackage: '',
  });
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const onSubmitCollectedData = (collectedData: IOnboardingCollectedData) => {
    //TODO: add here the logic for submitting the onboarding data to the server/RevenueCat
    setIsFirstTime(false);
    setIsOnboarded(true);
    router.navigate('/(tabs)');
  };

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
    setCurrentScreenIndex(2);
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
      <NamePreferenceScreen />
      <FreeTrialPreview />
      <Paywall />
    </FlowModal>
  );
}
