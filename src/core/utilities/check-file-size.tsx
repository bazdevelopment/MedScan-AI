/* eslint-disable max-lines-per-function */
import CustomAlert from '@/components/custom-alert';
import Toast from '@/components/toast';
import { IMAGE_SIZE_LIMIT_MB, VIDEO_SIZE_LIMIT_MB } from '@/constants/limits';

import { translate } from '../i18n';

export const checkFileSize = (
  fileSize: number,
  type: 'image' | 'video' | undefined,
): { isLimitReached: boolean | undefined } => {
  let isLimitReached;

  if (type === 'image' && fileSize > IMAGE_SIZE_LIMIT_MB) {
    Toast.showCustomToast(
      <CustomAlert
        title={translate('general.attention')}
        subtitle={translate('alerts.imageSizeLarge', {
          fileSize,
          imageLimit: IMAGE_SIZE_LIMIT_MB,
        })}
        buttons={[
          {
            label: translate('general.close'),
            variant: 'default',
            onPress: Toast.dismiss,
            buttonTextClassName: 'dark:text-white',
            className:
              'flex-1 rounded-xl h-[48] bg-primary-900 active:opacity-80 dark:bg-primary-900',
          },
        ]}
      />,
      {
        position: 'middle', // Place the alert in the middle of the screen
        duration: Infinity, // Keep the alert visible until dismissed
      },
    );

    isLimitReached = true;
  }

  if (type === 'video' && fileSize > VIDEO_SIZE_LIMIT_MB) {
    Toast.showCustomToast(
      <CustomAlert
        title={translate('general.attention')}
        subtitle={translate('alerts.videoSizeLarge', {
          fileSize,
          videoLimit: VIDEO_SIZE_LIMIT_MB,
        })}
        buttons={[
          {
            label: translate('general.close'),
            variant: 'default',
            onPress: Toast.dismiss,
            buttonTextClassName: 'dark:text-white',
            className:
              'flex-1 rounded-xl h-[48] bg-primary-900 active:opacity-80 dark:bg-primary-900',
          },
        ]}
      />,
      {
        position: 'middle', // Place the alert in the middle of the screen
        duration: Infinity, // Keep the alert visible until dismissed
      },
    );

    isLimitReached = true;
  }

  return { isLimitReached };
};
