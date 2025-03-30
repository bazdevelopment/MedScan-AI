import { useColorScheme } from 'nativewind';
import React from 'react';
import { View } from 'react-native';

import { translate } from '@/core';
import { Button, colors, Text } from '@/ui';
import { ResizeIcon } from '@/ui/assets/icons';

import { type IOpenStudioSection } from './open-studio-section.interface';

const OpenStudioSection = ({ squares, onOpenStudio }: IOpenStudioSection) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <>
      {squares.length > 0 ? (
        // EDIT MODE (when annotations exist)
        <View className="mx-6 mt-6 items-center justify-center rounded-xl border-primary-300 bg-primary-100 p-6 dark:bg-charcoal-900">
          <Text className="mb-2 text-center font-semibold-nunito text-xl text-gray-800">
            {translate(
              'components.ImageAnnotationStudio.OpenStudioSection.continueEditing',
            )}
          </Text>
          <Text className="mb-2 text-center text-gray-600">
            {translate(
              'components.ImageAnnotationStudio.OpenStudioSection.highlightedRegionsCount',
              { highlightedRegions: squares.length },
            )}
          </Text>

          <Button
            label={translate(
              'components.ImageAnnotationStudio.OpenStudioSection.editMore',
            )}
            className={`mb-0 h-[52] rounded-full border-[3px] border-primary-600 bg-blackEerie active:bg-charcoal-800 dark:border-primary-900 dark:bg-blackEerie`}
            size="lg"
            textClassName="text-md font-semibold-nunito text-white dark:text-white"
            onPress={onOpenStudio}
            icon={<ResizeIcon width={20} height={20} color={colors.white} />}
          />
        </View>
      ) : (
        <View className="border-1 mx-6 mt-6 items-center justify-center rounded-3xl  border-primary-300 bg-primary-100 p-6 dark:bg-charcoal-900">
          <Text className="mb-2 text-center font-semibold-nunito text-xl text-gray-800">
            {translate(
              'components.ImageAnnotationStudio.OpenStudioSection.highlightRegions',
            )}
          </Text>

          <Button
            label={translate(
              'components.ImageAnnotationStudio.OpenStudioSection.openStudioButton',
            )}
            className={`mb-0 h-[52]  rounded-full border-[3px] border-primary-600 bg-blackEerie active:bg-charcoal-800 dark:border-primary-900 dark:bg-blackEerie`}
            size="lg"
            textClassName="text-md font-semibold-nunito dark:text-white text-center"
            onPress={onOpenStudio}
            icon={
              <ResizeIcon
                width={20}
                height={20}
                color={isDark ? colors.white : colors.white}
              />
            }
          />
        </View>
      )}
    </>
  );
};

export default OpenStudioSection;
