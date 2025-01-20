import * as Sharing from 'expo-sharing';
import { useState } from 'react';

interface ShareLinkOptions {
  url: string;
  title?: string;
  message?: string;
}

export const useShareLink = () => {
  const [isSharing, setIsSharing] = useState(false);

  const shareLink = async ({ url, title, message }: ShareLinkOptions) => {
    try {
      setIsSharing(true);
      const isAvailable = await Sharing.isAvailableAsync();

      if (isAvailable) {
        await Sharing.shareAsync(url, {
          dialogTitle: title || 'Share Link',
          mimeType: 'text/plain',
          UTI: 'public.plain-text',
        });
      } else {
        // Fallback for web or platforms where native sharing isn't available
        if (navigator?.share) {
          await navigator.share({
            title,
            text: message,
            url,
          });
        } else {
          throw new Error('Sharing is not available on this platform');
        }
      }
    } catch (error) {
      console.error('Error sharing link:', error);
      throw error;
    } finally {
      setIsSharing(false);
    }
  };

  return {
    shareLink,
    isSharing,
  };
};
