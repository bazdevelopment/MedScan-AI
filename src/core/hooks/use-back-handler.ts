import { useEffect } from 'react';
import { BackHandler } from 'react-native';

type BackHandlerCallback = () => boolean;

const useBackHandler = (callback: BackHandlerCallback) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return callback();
      },
    );

    return () => backHandler.remove(); // Cleanup the event listener on unmount
  }, [callback]);
};

export default useBackHandler;
