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

/**
 * setUser Method
Purpose: Identify users in Crashlytics to track their sessions and crashes.

Scenarios:

After a user logs in or signs up.

When a user's session is restored (e.g., from AsyncStorage or a token).
 * 
--------------

  setAttributes Method
Purpose: Add custom attributes to crash reports for better context (e.g., user role, app version, etc.).

Scenarios:
When the app starts or when a user logs in.
When the app's state changes (e.g., user upgrades to premium).
--------------
logEvent Method
Purpose: Log custom events for analytics or debugging purposes.

Scenarios:

When a user performs a key action (e.g., clicks a button, completes a purchase).

When the app enters a specific state (e.g., a screen is loaded).
----------------
Purpose: Log non-fatal errors to Crashlytics for debugging (usually used in catch method)

Scenarios:

When an API call fails.

When an unexpected error occurs in a try-catch block.
 */

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
