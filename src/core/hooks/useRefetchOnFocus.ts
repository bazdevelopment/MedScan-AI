import { useFocusEffect } from 'expo-router';
import { useEffect, useState } from 'react';

export const useRefetchOnFocus = (refetch = () => {}, canRefetch = true) => {
  const [isScreenFocused, setIsScreenFocused] = useState(false);
  useFocusEffect(() => {
    setIsScreenFocused(true); // when i focus the screen
    return () => setIsScreenFocused(false); // when i quit the screen
  });

  /* the screen still always active in cache so we need to check that the screen is focused in a use effect
  to dispatch the refetch only one time to avoid the infinity loop*/
  useEffect(() => {
    if (isScreenFocused && canRefetch) {
      refetch();
    }
  }, [canRefetch, isScreenFocused, refetch]);
};
