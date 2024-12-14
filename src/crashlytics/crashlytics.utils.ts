import crashlytics from '@react-native-firebase/crashlytics';

import {
  type CrashlyticsAttributes,
  type CrashlyticsLogLevel,
} from './crashlytics.types';

export const formatError = (error: any): Error => {
  if (error instanceof Error) {
    return error;
  }
  return new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

export const setUserId = async (userId: string): Promise<void> => {
  try {
    await crashlytics().setUserId(userId);
  } catch (error) {
    console.error('Failed to set user ID:', error);
  }
};

export const setAttributes = async (
  attributes: CrashlyticsAttributes,
): Promise<void> => {
  try {
    await crashlytics().setAttributes(attributes);
  } catch (error) {
    console.error('Failed to set attributes:', error);
  }
};

export const logEvent = async (
  message: string,
  level: CrashlyticsLogLevel = 'info',
): Promise<void> => {
  try {
    await crashlytics().log(message);

    switch (level) {
      case 'fatal':
        crashlytics().recordError(new Error(message), 'fatal');
        break;
      case 'error':
        crashlytics().recordError(new Error(message));
        break;
      case 'warn':
        console.warn(message);
        break;
      case 'debug':
        console.debug(message);
        break;
      default:
        crashlytics().log(message);
    }
  } catch (error) {
    console.error('Failed to log message:', error);
  }
};

export const recordError = async (
  error: any,
  context?: string,
): Promise<void> => {
  try {
    const formattedError = formatError(error);
    if (context) {
      await crashlytics().log(context);
    }
    await crashlytics().recordError(formattedError);
  } catch (err) {
    console.error('Failed to record error:', err);
  }
};
