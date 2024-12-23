import { useColorScheme } from 'nativewind';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { usePdfConverter } from '@/core/hooks/use-pdf-converter';
import { useSharePdfContent } from '@/core/hooks/use-share-content';
import { colors } from '@/ui';
import { DownloadIcon, ShareIcon } from '@/ui/assets/icons';

import { type IShareActionButtons } from './share-action-buttons.interface';

/* Buttons for sharing a document */
const SharePdfActionButtons = ({
  heading,
  date,
  html,
}: IShareActionButtons) => {
  const { shareContent, isSharing } = useSharePdfContent();
  const { convertToPdfAndDownload, isConverting } = usePdfConverter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-row gap-3 self-end">
      {(isSharing || isConverting) && (
        <ActivityIndicator color={colors.black} />
      )}
      <TouchableOpacity
        className="mr-2"
        onPress={() =>
          shareContent({
            content: html,
            title: heading,
            date,
          })
        }
        disabled={isSharing || isConverting}
      >
        <ShareIcon color={isDark ? colors.white : colors.darkGray} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          convertToPdfAndDownload({
            html,
            title: heading,
            date,
          })
        }
        disabled={isSharing || isConverting}
      >
        <DownloadIcon color={isDark ? colors.white : colors.darkGray} />
      </TouchableOpacity>
    </View>
  );
};

export default SharePdfActionButtons;
