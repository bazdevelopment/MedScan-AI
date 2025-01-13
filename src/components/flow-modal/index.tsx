import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { type ICollectedData } from '@/core/flows/upload-file-flow/upload-file-flow.interface';

import { type IFlow } from './flow-modal.interface';

const FlowModal = ({
  currentScreenIndex,
  onGoNext,
  onGoBack,
  onFinish,
  collectedData,
  children,
}: IFlow) => {
  const totalSteps = React.Children.toArray(children).length;

  const isFirstScreenDisplayed = currentScreenIndex === 0;
  const isLastScreenDisplayed = currentScreenIndex === totalSteps - 1;

  const goToNextScreen = (data: ICollectedData) => onGoNext(data);
  const currentActiveScreen =
    React.Children.toArray(children)[currentScreenIndex];
  const wrappedCurrentChild = React.isValidElement(currentActiveScreen)
    ? React.cloneElement(currentActiveScreen, {
        goToNextScreen,
        collectedData,
        onGoBack: isFirstScreenDisplayed ? router.back : onGoBack,
        currentScreenIndex: currentScreenIndex + 1,
        totalSteps,
      })
    : currentActiveScreen;

  return <View className="flex-1">{wrappedCurrentChild}</View>;
};

export default FlowModal;
