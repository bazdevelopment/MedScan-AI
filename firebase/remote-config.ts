import remoteConfig from '@react-native-firebase/remote-config';

import { Env } from '@/core/env';

/**
 * Fetches a value from Firebase Remote Config.
 *
 * @param key The key for the remote config parameter.
 * @returns The value of the parameter as a string or null if it fails.
 */
// Function to check for app update
export const checkForAppUpdate = async (): Promise<{
  isUpdateRequired: boolean;
}> => {
  try {
    // Fetch and activate the latest remote config
    await remoteConfig()
      .fetchAndActivate()
      .catch((error) => alert(`remote config catch, ${JSON.stringify(error)}`));

    // Get all the configuration values
    const config = remoteConfig().getAll();

    const minimumVersion = config.MINIMUM_VERSION_ALLOWED._value || Env.VERSION;
    // Compare versions to determine if an update is required
    const isUpdateRequired = compareVersions(minimumVersion, Env.VERSION);

    return { isUpdateRequired };
  } catch (error) {
    alert(`checkForAppUpdate catch, ${JSON.stringify(error)}`);
    console.error('Error fetching or activating remote config:', error);

    throw new Error(
      `Failed to fetch and activate remote config: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

// A simple version comparison function to check if an update is required
const compareVersions = (
  minVersion: string,
  currentVersion: string,
): boolean => {
  const minParts = minVersion.split('.').map(Number);
  const currentParts = currentVersion.split('.').map(Number);

  for (let i = 0; i < Math.max(minParts.length, currentParts.length); i++) {
    const min = minParts[i] || 0;
    const curr = currentParts[i] || 0;
    if (curr < min) return true;
    if (curr > min) return false;
  }

  return false;
};
