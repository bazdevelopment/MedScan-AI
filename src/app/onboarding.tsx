/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { useUpdateUser, useUser } from '@/api/user/user.hooks';
import FlowModal from '@/components/flow-modal';
import Toast from '@/components/toast';
import { useSelectedLanguage } from '@/core';
import { useIsFirstTime } from '@/core/hooks';
import FreeTrialPreview from '@/core/screens/free-trial-preview';
import NamePreferenceScreen from '@/core/screens/name-preference-screen';
import Paywall from '@/core/screens/paywall';

interface IOnboardingCollectedData {
  preferredName: string;
  selectedPackage: string;
}

export default function Onboarding() {
  const [, setIsFirstTime] = useIsFirstTime();

  const { language } = useSelectedLanguage();
  const { data: userInfo } = useUser(language);
  const { mutateAsync: onUpdateUser } = useUpdateUser();

  const router = useRouter();

  const [collectedData, setCollectedData] = useState<IOnboardingCollectedData>({
    preferredName: '',
    selectedPackage: '',
  });
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const onSubmitCollectedData = async (
    collectedData: IOnboardingCollectedData,
  ) => {
    //TODO: add here the logic for submitting the onboarding data to the server/RevenueCat
    // setIsFirstTime(false);
    // setIsOnboarded(true);
    // router.navigate('/(tabs)');

    await onUpdateUser({
      language,
      userId: userInfo.userId,
      fieldsToUpdate: {
        isOnboarded: true,
      },
    })
      .then(() => {
        setIsFirstTime(false);
        router.navigate('/(tabs)');
      })
      .catch(() => Toast.error('Onboarding failed. Please try again.'));
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
