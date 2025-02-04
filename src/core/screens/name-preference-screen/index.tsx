import React, { useState } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import ProgressDots from '@/components/progress-dots';
import { DEVICE_TYPE } from '@/core/utilities/device-type';
import { Button, Input, Text } from '@/ui';

interface OnboardingScreenProps {
  onNext: (nickname: string) => void;
  onSkip: () => void;
}

const NamePreferenceScreen = ({
  goToNextScreen,
  onSkip,
  totalSteps,
  currentScreenIndex,
}: OnboardingScreenProps) => {
  const [nickname, setNickname] = useState('');

  return (
    <KeyboardAvoidingView
      className="flex-1"
      style={{ flex: 1, paddingTop: DEVICE_TYPE.IOS ? 80 : 70 }}
      behavior="height"
      keyboardVerticalOffset={-30}
    >
      <ScrollView
        contentContainerClassName="flex-1"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6">
          <Text className="mb-2 font-bold-nunito text-[32px] text-primary-900">
            Let's make this personal!
          </Text>

          <Text className="mb-4 mt-2 text-lg text-gray-600">
            What should we call you?
          </Text>

          <View className="mt-2">
            <Input
              className="flex-1 rounded-xl bg-white px-3.5 py-5 font-primary-nunito dark:border-neutral-700 dark:bg-charcoal-800 dark:text-white"
              placeholder="E.g., Captain Cool, Queen Bee, or just Alex!"
              value={nickname}
              onChangeText={setNickname}
              label="Nickname"
            />
          </View>

          {/* Bottom Navigation */}
          <View className="mb-16 mt-auto flex-row items-end justify-between">
            <View className="gap-12">
              <ProgressDots
                className="ml-2"
                totalSteps={totalSteps}
                currentStep={currentScreenIndex}
              />

              <Button
                onPress={onSkip}
                label="Skip"
                className="bg-transparent active:opacity-60 dark:bg-transparent"
                textClassName="text-black text-bold-nunito text-lg dark:text-white"
              />
            </View>

            <Button
              onPress={() => {
                goToNextScreen({ preferredName: nickname });
                Keyboard.dismiss();
              }}
              label="Next"
              className="bottom-[-10px] mt-6 h-[56px] w-[150px] rounded-xl border-2 border-primary-900 bg-primary-900 pl-5 dark:bg-primary-900"
              textClassName="text-lg text-white dark:text-white"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NamePreferenceScreen;
