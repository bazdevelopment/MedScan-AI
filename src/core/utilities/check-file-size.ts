import { translate } from '../i18n';

export const checkFileSize = (
  fileSize: number,
  type: 'image' | 'video' | undefined,
): { isLimitReached: boolean | undefined } => {
  const imageLimit = 5; // 5 MB limit for images
  const videoLimit = 20; // 20 MB limit for videos

  let isLimitReached;

  if (type === 'image' && fileSize > imageLimit) {
    alert(translate('alerts.imageSizeLarge', { fileSize, imageLimit }));

    isLimitReached = true;
  }

  if (type === 'video' && fileSize > videoLimit) {
    alert(translate('alerts.videoSizeLarge', { fileSize, videoLimit }));

    isLimitReached = true;
  }

  return { isLimitReached };
};
