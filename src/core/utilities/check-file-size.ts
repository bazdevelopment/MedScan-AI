export const checkFileSize = (
  fileSize: number,
  type: 'image' | 'video' | undefined,
): { isLimitReached: boolean | undefined } => {
  const imageLimit = 5; // 5 MB limit for images
  const videoLimit = 20; // 20 MB limit for videos

  let isLimitReached;

  if (type === 'image' && fileSize > imageLimit) {
    alert(
      `Image is too large! File size is ${fileSize} MB, but the limit is ${imageLimit} MB.`,
    );

    isLimitReached = true;
  }

  if (type === 'video' && fileSize > videoLimit) {
    alert(
      `Video is too large! File size is ${fileSize} MB, but the limit is ${videoLimit} MB.`,
    );
    isLimitReached = true;
  }

  return { isLimitReached };
};
