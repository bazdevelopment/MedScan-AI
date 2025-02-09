/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { queryClient } from '@/api';
import { useUpdateUser, useUser } from '@/api/user/user.hooks';
import FlowModal from '@/components/flow-modal';
import { useSelectedLanguage } from '@/core';
import { useIsFirstTime } from '@/core/hooks';
import { useCrashlytics } from '@/core/hooks/use-crashlytics';
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
  const { mutateAsync: onUpdateUser, isPending: isPendingUpdateUser } =
    useUpdateUser();
  const { logEvent, recordError } = useCrashlytics();

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

    await onUpdateUser({
      language,
      userId: userInfo.userId,
      fieldsToUpdate: {
        isOnboarded: true,
        ...(!!collectedData.preferredName && {
          userName: collectedData.preferredName,
        }),
      },
    })
      .then(() => {
        queryClient.setQueryData(['user-info'], (oldData) => ({
          ...oldData,
          isOnboarded: true,
        }));

        setIsFirstTime(false);
        router.navigate('/(tabs)');
        logEvent(
          `User ${userInfo.userId} has been onboarded successfully and he selected ${collectedData.selectedPackage} plan and he is redirected to home screen`,
        );
      })
      .catch(
        (error) =>
          recordError(
            error,
            'Failure on completing onboarding (but it can be false - known issue)',
          ),
        // Toast.error(translate('alerts.onboardingUnsuccessful'))
      );
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
      onPending={isPendingUpdateUser}
    >
      <NamePreferenceScreen />
      <FreeTrialPreview />
      <Paywall />
    </FlowModal>
  );
}
