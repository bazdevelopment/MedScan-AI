import { FILE_UPLOAD_PROMPT_MESSAGES } from '__mocks__/prompt-messages';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { translate } from '@/core';
import { colors, Input, Text } from '@/ui';

import { type IPromptSection } from './prompt-section.interface';

const PromptSection = ({
  promptMessage,
  onUpdatePromptMessage,
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
    <View className="mt-2 w-full px-2 ">
      <Text className="mb-2 ml-1 font-bold-nunito text-2xl text-primary-900">
        {translate('general.chatbotPlaceholder')}
      </Text>

      <Input
        className="font-regular-nunito  min-h-[80] w-full rounded-xl border border-gray-300 bg-white p-3 text-base text-gray-800 dark:border-charcoal-600 dark:bg-charcoal-900 dark:text-white"
        multiline
        // numberOfLines={3}
        //todo: long placeholder is not completely shown because of min-h-[100px], find the cause
        placeholder={`${FILE_UPLOAD_PROMPT_MESSAGES[currentPrompt]}`}
        placeholderTextColor={colors.charcoal[400]}
        onChangeText={onUpdatePromptMessage}
        textAlignVertical="top"
        value={promptMessage}
        maxLength={150}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

export default PromptSection;
