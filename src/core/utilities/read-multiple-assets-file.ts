import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

const { cacheDirectory } = FileSystem;

/**
 * Reads multiple asset files and returns an array of base64 encoded strings.
 *
 * @param {Object} params - The parameters object.
 * @param {any[]} params.files - The array of asset files to read.
 * @returns {Promise<string[]>} - A promise that resolves to an array of base64 encoded strings.
 */
export async function readMultipleAssetFiles({
  files,
}: {
  files: any[];
}): Promise<string[]> {
  try {
    // Load all assets asynchronously
    const assets = await Asset.loadAsync(files);

    // Process each asset
    const base64Promises = assets.map(
      async ({ localUri, name, hash, type }) => {
        let uri = localUri ?? '';

        // Ensure the URI is correct
        if (!uri?.startsWith('file://')) {
          if (Platform.OS === 'android') {
            uri = `${cacheDirectory}ExponentAsset-${hash}.${type}`;
          }
        }

        // Read the file content as a base64 encoded string
        return await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      },
    );

    // Wait for all base64 conversions to complete
    return await Promise.all(base64Promises);
  } catch (error) {
    console.error('Error reading asset files:', error);
    throw error;
  }
}
