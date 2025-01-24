import { useMMKVBoolean } from 'react-native-mmkv';

import { storage } from '../storage';

const IS_ONBOARDED = 'IS_ONBOARDED';

export const useIsOnboarded = () => {
  const [isOnboarded, setIsOnboarded] = useMMKVBoolean(IS_ONBOARDED, storage);
  if (isOnboarded === undefined) {
    return [false, setIsOnboarded] as const;
  }
  return [isOnboarded, setIsOnboarded] as const;
};
