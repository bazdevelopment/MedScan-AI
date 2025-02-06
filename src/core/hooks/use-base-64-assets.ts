import { useEffect, useState } from 'react';

import { readMultipleAssetFiles } from '../utilities/read-multiple-assets-file';

export const useBase64Assets = () => {
  const [base64Images, setBase64Images] = useState<{
    logo?: string;
    medicalFrame?: string;
  }>({});

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageFiles = [
          require('../../../assets/icon_transparent.png'),
          require('../../../assets/medical_frame.png'),
        ];

        // Load images as Base64
        const base64Images = await readMultipleAssetFiles({
          files: imageFiles,
        });

        // Store them in state
        setBase64Images({
          logo: base64Images[0],
          medicalFrame: base64Images[1],
        });
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []); // Runs once when the component mounts

  return { base64Images };
};
