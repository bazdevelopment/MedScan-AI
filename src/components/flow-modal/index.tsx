import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { type IOnboardingCollectedData } from '@/app/onboarding';
import { type ICollectedData } from '@/core/flows/upload-file-flow/upload-file-flow.interface';
import { FocusAwareStatusBar } from '@/ui';

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
    <View className="flex-1">
      <FocusAwareStatusBar hidden />
      {wrappedCurrentChild}
    </View>
  );
};

export default FlowModal;
