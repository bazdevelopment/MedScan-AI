import React from 'react';
import { View } from 'react-native';

import { Button, Text } from '@/ui';

import { type IEdgeCaseTemplate } from './edge-case-template.interface';

const EdgeCaseTemplate = ({
  image,
  title,
  message,
  primaryAction,
  secondaryAction,
  additionalClassName = '',
}: IEdgeCaseTemplate) => {
  return (
    <View
      className={`flex-1 items-center justify-center px-6 ${additionalClassName}`}
    >
      {image && <View className="mb-4">{image}</View>}
      <Text className="mb-2 text-center text-2xl font-semibold text-gray-900">
        {title}
      </Text>
      <Text className=" mb-8 text-center text-base text-gray-600">
        {message}
      </Text>

      <View className="w-full flex-row items-center justify-center gap-4">
        {!!primaryAction && (
          <Button
            label={primaryAction.label}
            className="rounded-full"
            variant="default"
            icon={primaryAction.icon}
            onPress={primaryAction.onPress}
          />
        )}
        {!!secondaryAction && (
          <Button
            label={secondaryAction.label}
            className="rounded-full"
            variant="default"
          />
        )}
      </View>
    </View>
  );
};

export default EdgeCaseTemplate;
