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
  position = 'vertical',
}: IShareActionButtons) => {
  const { shareContent, isSharing } = useSharePdfContent();
  const { convertToPdfAndDownload, isConverting } = usePdfConverter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const alignment = position === 'vertical' ? 'flex-col' : 'flex-row';
  return (
    <View className={`right-[-30px] flex-row gap-5 self-center ${alignment}`}>
      {(isSharing || isConverting) && (
        <ActivityIndicator
          color={isDark ? colors.white : colors.black}
          className="top-[-5]"
        />
      )}
      <TouchableOpacity
        className="p-1"
        onPress={() =>
          shareContent({
            content: html,
            title: heading,
            date,
          })
        }
        disabled={isSharing || isConverting}
      >
        <ShareIcon
          color={isDark ? colors.white : colors.darkGray}
          width={26}
          height={26}
          top={-3}
        />
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
        <DownloadIcon color={colors.primary[900]} width={28} height={28} />
      </TouchableOpacity>
    </View>
  );
};

export default SharePdfActionButtons;
