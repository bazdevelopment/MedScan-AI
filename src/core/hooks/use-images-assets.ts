import { Asset } from 'expo-asset';
import { useEffect, useState } from 'react';

const useImagesAssets = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const assetPaths = [
    require('../../../assets/icon_transparent.png'),
    require('../../../assets/medical_frame.png'),
  ];
  useEffect(() => {
    const loadAssetsAsync = async () => {
      try {
        // Convert asset paths to Asset objects
        // Load all assets
        await Asset.loadAsync(assetPaths);
        setAssetsLoaded(true);
      } catch (err) {
        console.error('Failed to load assets:', err);
        setError(err);
      }
    };

    loadAssetsAsync();
  }, []);

  return { assetsLoaded, error };
};

export default useImagesAssets;
