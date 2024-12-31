import { VIDEO_EXTENSIONS } from '@/constants/video-extensions';

export function checkIsVideo(fileExtension: string) {
  // Normalize the input to lower case for case-insensitive comparison
  const normalizedInput = fileExtension?.toLowerCase();

  // Check if the input includes any keyword in the VIDEO_EXTENSIONS list
  return VIDEO_EXTENSIONS.some((extension) =>
    normalizedInput?.includes(extension.toLowerCase()),
  );
}
