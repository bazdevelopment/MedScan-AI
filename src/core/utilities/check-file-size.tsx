/* eslint-disable max-lines-per-function */
import { IMAGE_SIZE_LIMIT_MB, VIDEO_SIZE_LIMIT_MB } from '@/constants/limits';

export const checkFileSize = (
  fileSize: number,
  type: 'image' | 'video' | undefined,
): { isLimitReached: boolean | undefined } => {
  let isLimitReached;

  if (type === 'image' && fileSize > IMAGE_SIZE_LIMIT_MB) {
    isLimitReached = true;
  }

  if (type === 'video' && fileSize > VIDEO_SIZE_LIMIT_MB) {
    isLimitReached = true;
  }

  return { isLimitReached };
};
