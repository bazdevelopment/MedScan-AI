import { Image } from 'react-native';

/**
 * Get dimensions of a local image asset
 * @param imageSource - require() path to the local image
 * @returns Promise<{width: number, height: number}>
 */
export const getLocalImageSize = async (
  imageSource: any,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    try {
      // Get the resolved asset URI (works for both static resources and require())
      const resolvedAssetSource = Image.resolveAssetSource(imageSource);

      if (!resolvedAssetSource || !resolvedAssetSource.uri) {
        throw new Error('Invalid image source');
      }

      // For local files (file:// URIs), we can use getSize
      Image.getSize(
        resolvedAssetSource.uri,
        (width, height) => resolve({ width, height }),
        (error) => reject(error),
      );
    } catch (error) {
      reject(error);
    }
  });
};

// New function to handle dynamic URIs
export const getDynamicImageSize = (
  uri: string,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => resolve({ width, height }),
      (error) => reject(error),
    );
  });
};
