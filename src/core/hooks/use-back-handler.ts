import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (callback: () => void) => {
  useEffect(() => {
    const backAction = () => {
      // If a callback is provided, execute it and return true to prevent default behavior
      if (callback) {
        callback();
      }
      return false; // If false is returned, default back behavior will be triggered, check what happens if you set
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup the event listener on unmount
  }, [callback]);
};

export default useBackHandler;
