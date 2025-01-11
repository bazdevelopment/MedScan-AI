import { FILE_UPLOAD_PROMPT_MESSAGES } from '__mocks__/prompt-messages';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Input, Text } from '@/ui';

import { type IPromptSection } from './prompt-section.interface';

const PromptSection = ({
  promptMessage,
  additionalInfo,
  onUpdatePromptMessage,
  onUpdateAdditionalInfo,
}: IPromptSection) => {
  const [currentPrompt, setCurrentPrompt] = useState(0);

  useEffect(() => {
    // Skip setting up the interval if inputValue exists
    if (promptMessage) return;

    const interval = setInterval(() => {
      setCurrentPrompt(
        (prev) => (prev + 1) % FILE_UPLOAD_PROMPT_MESSAGES.length,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [promptMessage]);

  return (
    <View className="w-full rounded-lg bg-gray-100 p-4 dark:bg-charcoal-900">
      <Text className="mb-2 font-semibold-nunito text-lg text-gray-700">
        Tell us what you want to know
      </Text>
      <Input
        className="min-h-[100px] w-full rounded-md border border-gray-300 bg-white p-3 text-gray-800 dark:border-charcoal-600 dark:bg-charcoal-900 dark:text-white"
        multiline
        numberOfLines={3}
        //todo: long placeholder is not completely shown because of min-h-[100px], find the cause
        placeholder={FILE_UPLOAD_PROMPT_MESSAGES[currentPrompt]}
        onChangeText={onUpdatePromptMessage}
        textAlignVertical="top"
        value={promptMessage}
        underlineColorAndroid="transparent"
      />
      <View className="mt-4">
        <Text className="mb-1 font-semibold-nunito text-lg text-gray-700">
          Additional information:
        </Text>
        <Input
          className="min-h-[60px] w-full rounded-md border border-gray-300 bg-white p-3 text-gray-800 dark:border-charcoal-600 dark:bg-charcoal-900 dark:text-white"
          placeholder="Enter any relevant clinical history or specific concerns..."
          multiline
          numberOfLines={3}
          onChangeText={onUpdateAdditionalInfo}
          value={additionalInfo}
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
};

export default PromptSection;
