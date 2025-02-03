import { router } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';

import { type IOnboardingCollectedData } from '@/app/onboarding';
import { type ICollectedData } from '@/core/flows/upload-file-flow/upload-file-flow.interface';
import getDeviceSizeCategory from '@/core/utilities/get-device-size-category';

import { type IFlow } from './flow-modal.interface';

const FlowModal = ({
  currentScreenIndex,
  onGoNext,
  onGoBack,
  onFinish,
  collectedData,
  children,
  onSkip,
  resetFlow,
}: IFlow) => {
  const { isVerySmallDevice } = getDeviceSizeCategory();

  const totalSteps = React.Children.toArray(children).length;

  const isFirstScreenDisplayed = currentScreenIndex === 0;
  const _isLastScreenDisplayed = currentScreenIndex === totalSteps - 1;

  const goToNextScreen = (data: ICollectedData | IOnboardingCollectedData) =>
    onGoNext(data);
  const currentActiveScreen =
    React.Children.toArray(children)[currentScreenIndex];
  const wrappedCurrentChild = React.isValidElement(currentActiveScreen)
    ? React.cloneElement(currentActiveScreen, {
        goToNextScreen,
        collectedData,
        onGoBack: isFirstScreenDisplayed ? router.back : onGoBack,
        currentScreenIndex: currentScreenIndex,
        totalSteps,
        onFinish,
        onSkip,
        resetFlow,
      })
    : currentActiveScreen;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName={`${isVerySmallDevice ? 'pb-[100]' : undefined}`}
    >
      {wrappedCurrentChild}
    </ScrollView>
  );
};

export default FlowModal;
