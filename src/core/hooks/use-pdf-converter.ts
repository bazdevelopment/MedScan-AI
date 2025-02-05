import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DocumentOpener from 'react-native-document-opener';

import dayjs from '../../lib/dayjs';

export const usePdfConverter = () => {
  const [isConverting, setIsConverting] = useState(false);
  const {
    i18n: { language },
  } = useTranslation();

  const convertToPdfAndDownload = async ({
    html,
    title,
    date,
  }: {
    html: string;
    title: string;
    date: Date;
  }) => {
    try {
      setIsConverting(true);
      // Generate PDF from HTML
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      // Create a new file name with timestamp to avoid conflicts
      // const timestamp = dayjs(date).format('YYYY-MM-DD');
      const newFileName = `${title || 'Report'} (${dayjs(date).locale(language).format('MMMM D, YYYY')}).pdf`;
      const newUri = `${FileSystem.documentDirectory}${newFileName}`;

      // Copy the file to documents directory
      await FileSystem.copyAsync({
        from: uri,
        to: newUri,
      });

      // Delete the temporary file
      await FileSystem.deleteAsync(uri);

      if (newUri) {
        await DocumentOpener.openAsync(newUri);
      }
    } catch (error) {
      console.error('Error converting to PDF:', error);
      throw error;
    } finally {
      setIsConverting(false);
    }
  };

  return { convertToPdfAndDownload, isConverting };
};
