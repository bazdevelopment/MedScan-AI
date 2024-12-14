import { useCallback } from 'react';

import {
  type CrashlyticsAttributes,
  type CrashlyticsLogLevel,
} from '@/crashlytics/crashlytics.types';
import {
  logEvent,
  recordError,
  setAttributes,
  setUserId,
} from '@/crashlytics/crashlytics.utils';

export const useCrashlytics = () => {
  const handleSetUser = useCallback(async (userId: string) => {
    await setUserId(userId);
  }, []);

  const handleSetAttributes = useCallback(
    async (attributes: CrashlyticsAttributes) => {
      await setAttributes(attributes);
    },
    [],
  );

  const handleLogEvent = useCallback(
    async (message: string, level: CrashlyticsLogLevel = 'info') => {
      await logEvent(message, level);
    },
    [],
  );

  const handleRecordError = useCallback(
    async (error: any, context?: string) => {
      await recordError(error, context);
    },
    [],
  );

  return {
    setUser: handleSetUser,
    setAttributes: handleSetAttributes,
    logEvent: handleLogEvent,
    recordError: handleRecordError,
  };
};
