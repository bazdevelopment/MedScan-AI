import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

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
    <View className="flex-1">
      <View className="bg-primary-300 px-[16px] dark:bg-charcoal-900">
        <View className="mt-8 flex-row items-center">
          {!isLastScreenDisplayed && (
            <>
              <TouchableOpacity
                onPress={isFirstScreenDisplayed ? router.back : onGoBack}
              >
                <ArrowLeft color={colors.white} width={24} height={24} />
              </TouchableOpacity>

              <View className="flex-1 flex-row justify-center ">
                <ProgressBar
                  currentStep={currentScreenIndex + 1}
                  totalSteps={totalSteps}
                  isTextShown
                />
              </View>
            </>
          )}
        </View>
      </View>
      {wrappedCurrentChild}
    </View>
  );
};

export default FlowModal;
