import React from 'react';
import { View } from 'react-native';

import { translate } from '@/core';
import { Button, colors, Text } from '@/ui';
import { ResizeIcon } from '@/ui/assets/icons';

import { type IOpenStudioSection } from './open-studio-section.interface';

const OpenStudioSection = ({ squares, onOpenStudio }: IOpenStudioSection) => {
  const hasSquares = squares.length > 0;

  return (
    <View className="mt-3 flex-row items-center justify-between rounded-lg border border-primary-300 bg-primary-100 px-4 py-3 dark:border-charcoal-600 dark:bg-blackEerie">
      <View className="flex-1 pr-3">
        <Text className="font-semibold-nunito text-base text-gray-800">
          {translate(
            hasSquares
              ? 'components.ImageAnnotationStudio.OpenStudioSection.continueEditing'
              : 'components.ImageAnnotationStudio.OpenStudioSection.highlightRegions',
          )}
        </Text>
        {hasSquares && (
          <Text className="text-xs text-gray-600">
            {squares.length} {squares.length === 1 ? 'region' : 'regions'}
          </Text>
        )}
      </View>

      <Button
        label={
          hasSquares
            ? translate(
                'components.ImageAnnotationStudio.OpenStudioSection.editMore',
              )
            : translate(
                'components.ImageAnnotationStudio.OpenStudioSection.openStudioButton',
              )
        }
        className="min-w-[60px] justify-center rounded-full border-2 border-primary-900 bg-blackEerie px-3 dark:bg-blackEerie"
        textClassName="text-xs text-center font-semibold-nunito text-white dark:text-white"
        onPress={onOpenStudio}
        icon={<ResizeIcon width={12} height={12} color={colors.white} />}
      />
    </View>
  );
};

export default OpenStudioSection;
