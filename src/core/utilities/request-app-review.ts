import * as StoreReview from 'expo-store-review';

import { storage } from '../storage';

const STORAGE_KEYS = {
  HAS_RATED: 'app_has_rated',
} as const;

interface RatingResult {
  success: boolean;
  method?: 'native_dialog' | 'store_redirect';
  skipped?: boolean;
  reason?: string;
  error?: string;
}
/**
 * Simple function to request app rating with spam protection
 * Call this once after user completes onboarding or any positive action
 */
export const requestInAppRating = async (): Promise<RatingResult> => {
  try {
    // Check if we should request rating
    const { canRequest, reason } = shouldRequestInAppRating();

    if (!canRequest) {
      console.log(`Skipping rating request: ${reason}`);
      return {
        success: true,
        skipped: true,
        reason: reason,
      };
    }

    // Check if store review is available on this device
    const isAvailable = await StoreReview.isAvailableAsync();

    if (!isAvailable) {
      console.log('Store review not available on this device');
      return { success: false, error: 'Store review not available' };
    }

    // Check if device supports native rating dialog
    const hasAction = await StoreReview.hasAction();

    if (hasAction) {
      // Show native rating dialog (preferred method)
      await StoreReview.requestReview();
      // Automatically mark as rated after showing the dialog
      markUserHasRated();
      return { success: true, method: 'native_dialog' };
    } else {
      // Fallback: redirect to store page
      await StoreReview.requestReview();
      // Automatically mark as rated after redirect
      markUserHasRated();
      return { success: true, method: 'store_redirect' };
    }
  } catch (error) {
    console.error('Error requesting app rating:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Check if user has already rated the app
 */
const shouldRequestInAppRating = (): {
  canRequest: boolean;
  reason?: string;
} => {
  // Check if user has already rated
  const hasRated = storage.getBoolean(STORAGE_KEYS.HAS_RATED);
  if (hasRated) {
    return { canRequest: false, reason: 'User has already rated the app' };
  }

  return { canRequest: true };
};
/**
 * Mark that user has rated the app
 */
export const markUserHasRated = (): void => {
  storage.set(STORAGE_KEYS.HAS_RATED, true);
};

/**
 * Request rating with a delay (good UX after completing onboarding)
 */
export const requestAppRatingWithDelay = (delayMs: number = 2000): void => {
  setTimeout(async () => {
    const result = await requestInAppRating();
    console.log('Rating request result:', result);
  }, delayMs);
};
