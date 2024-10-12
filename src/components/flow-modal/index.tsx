import React from 'react';
import { View } from 'react-native';

import { colors } from '@/ui';
import { ArrowLeft } from '@/ui/assets/icons';

import ProgressBar from '../progress-bar';
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

  const goToNextScreen = (data: object) => onGoNext(data);
  const currentActiveScreen =
    React.Children.toArray(children)[currentScreenIndex];

  const wrappedCurrentChild = React.isValidElement(currentActiveScreen)
    ? React.cloneElement(currentActiveScreen, {
        goToNextScreen,
        collectedData,
        ...(isLastScreenDisplayed ? onFinish : null),
      })
    : currentActiveScreen;

  return (
    <>
      <View className="bg-primary-300 px-[16px]">
        <View className="mt-8 flex-row items-center">
          <ArrowLeft color={colors.white} width={24} height={24} />
          <View className="flex-1 flex-row justify-center ">
            <ProgressBar currentStep={currentScreenIndex + 1} totalSteps={3} />
          </View>
        </View>
      </View>
      {wrappedCurrentChild}
    </>
  );
};

export default FlowModal;
