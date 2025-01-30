import remoteConfig from '@react-native-firebase/remote-config';
import { useEffect, useState } from 'react';

const useRealtimeConfig = (): { MINIMUM_VERSION_ALLOWED: string } => {
  const [configs, setConfigs] = useState({});

  const parseConfigValue = (value: any) => {
    // First try to parse as boolean
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;

    // Then try to parse as number
    const numberValue = Number(value);
    if (!isNaN(numberValue)) return numberValue;

    // Try to parse as JSON
    try {
      return JSON.parse(value);
    } catch {
      // If all else fails, return as string
      return value;
    }
  };

  // Helper function to get all config values
  const getConfigValues = () => {
    remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 0,
    });
    const allConfigs = remoteConfig().getAll();

    // Transform to simple key-value object
    return Object.fromEntries(
      Object.entries(allConfigs).map(([key, value]) => {
        const stringValue = value.asString();
        return [key, parseConfigValue(stringValue)];
      }),
    );
  };

  // Initial fetch
  const fetchInitialValues = async () => {
    await remoteConfig().fetchAndActivate();
    setConfigs(getConfigValues());
  };

  useEffect(() => {
    fetchInitialValues();

    // Set up real-time listener
    const unsubscribe = remoteConfig().onConfigUpdated(async () => {
      console.log('intra aici');
      await remoteConfig().activate();
      setConfigs(getConfigValues());
    });

    // Cleanup
    return () => unsubscribe();
  }, []); // Empty dependency array since we're getting all values

  return configs as { MINIMUM_VERSION_ALLOWED: string };
};

export default useRealtimeConfig;
