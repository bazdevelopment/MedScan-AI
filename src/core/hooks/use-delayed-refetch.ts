import { useCallback, useState } from 'react';

import { useHaptic } from './use-haptics';

interface UseDelayedRefetch {
  isRefetching: boolean;
  onRefetch: () => void;
}

export const useDelayedRefetch = (
  refetch: () => void,
  delay: number = 1000,
): UseDelayedRefetch => {
  const [isRefetching, setIsRefetching] = useState(false);
  const addSuccessHapticEffect = useHaptic('selection');

  const onRefetch = useCallback(() => {
    setIsRefetching(true);
    addSuccessHapticEffect?.();

    setTimeout(() => {
      refetch();

      setIsRefetching(false);
    }, delay);
  }, [refetch, delay, addSuccessHapticEffect]);

  return { isRefetching, onRefetch };
};
