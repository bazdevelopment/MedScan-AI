import { IMAGE_SIZE_LIMIT_MB, VIDEO_SIZE_LIMIT_MB } from '@/constants/limits';

import { translate } from '../i18n';

export const checkFileSize = (
  fileSize: number,
  type: 'image' | 'video' | undefined,
): { isLimitReached: boolean | undefined } => {
  let isLimitReached;

  if (type === 'image' && fileSize > IMAGE_SIZE_LIMIT_MB) {
    alert(
      translate('alerts.imageSizeLarge', {
        fileSize,
        imageLimit: IMAGE_SIZE_LIMIT_MB,
      }),
    );

    isLimitReached = true;
  }

  if (type === 'video' && fileSize > VIDEO_SIZE_LIMIT_MB) {
    alert(
      translate('alerts.videoSizeLarge', {
        fileSize,
        videoLimit: VIDEO_SIZE_LIMIT_MB,
      }),
    );

    isLimitReached = true;
  }

  return { isLimitReached };
};
