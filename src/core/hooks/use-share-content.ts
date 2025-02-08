import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';

import Toast from '@/components/toast';

import { translate } from '../i18n';

export const useSharePdfContent = () => {
  const [isSharing, setIsSharing] = useState(false);

  const shareContent = async ({
    content,
    title,
    date,
  }: {
    content: string;
    title: string;
    date: Date;
  }) => {
    try {
      setIsSharing(true);
      const isAvailable = await Sharing.isAvailableAsync();

      if (isAvailable) {
        // Generate PDF from HTML
        const { uri } = await Print.printToFileAsync({
          html: content,
          base64: false,
        });

        // Create a new file name with timestamp to avoid conflicts
        // const timestamp = dayjs(date).format('YYYY-MM-DD');
        const newFileName = `${title} (${date}).pdf`;
        const newUri = `${FileSystem.documentDirectory}${newFileName}`;
        // Copy the file to documents directory
        await FileSystem.copyAsync({
          from: uri,
          to: newUri,
        });

        // Delete the temporary file
        await FileSystem.deleteAsync(uri);

        // Preview and share the PDF
        await Sharing.shareAsync(newUri, {
          UTI: '.pdf',
          mimeType: 'application/pdf',
          dialogTitle: translate('general.share'),
        });
      } else {
        Toast.error(translate('alerts.sharingNotAvailable'));
      }
    } catch (error) {
      console.error('Error sharing content:', error);
      throw error;
    } finally {
      setIsSharing(false);
    }
  };

  return { shareContent, isSharing };
};
