import { router } from 'expo-router';

import { Env } from '@/core/env';

/**
 * Fetches a value from Firebase Remote Config.
 *
 * @param key The key for the remote config parameter.
 * @returns The value of the parameter as a string or null if it fails.
 */
// Function to check for app update
export const checkForAppUpdate = async (minVersionAllowed: string) => {
  try {
    // Compare versions to determine if an update is required
    const isUpdateRequired = compareVersions(minVersionAllowed, Env.VERSION);
    if (isUpdateRequired) return router.navigate('/new-app-version');
  } catch (error) {
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
  const minParts = minVersion?.split('.')?.map(Number);
  const currentParts = currentVersion?.split('.')?.map(Number);

  for (let i = 0; i < Math.max(minParts?.length, currentParts?.length); i++) {
    const min = minParts[i] || 0;
    const curr = currentParts[i] || 0;
    if (curr < min) return true;
    if (curr > min) return false;
  }

  return false;
};
