// For deep comparison
import { useEffect } from 'react';
import { type CustomerInfo } from 'react-native-purchases';

import { useUpdateUser, useUser } from '@/api/user/user.hooks';

import { useSelectedLanguage } from '../i18n';

export const useUpdateUserSubscription = (customerInfo: CustomerInfo) => {
  const { language } = useSelectedLanguage();
  const { data: userInfo } = useUser(language);
  const { mutateAsync: onUpdateUser, isPending: isPendingUpdateUser } =
    useUpdateUser();

  useEffect(() => {
    if (!customerInfo || !userInfo?.userId) {
      return; // Skip if customerInfo or userId is missing
    }

    // Extract subscription-related fields from customerInfo
    const customerSubscriptionData = {
      activeSubscriptionsRevenue: customerInfo.activeSubscriptions || [],
      allExpirationDatesRevenue: customerInfo.allExpirationDates || {},
      allPurchaseDatesRevenue: customerInfo.allPurchaseDates || {},
      allPurchasedProductIdentifiersRevenue:
        customerInfo.allPurchasedProductIdentifiers || [],
      firstSeenRevenue: customerInfo.firstSeen || null,
    };

    const updateUserSubscription = async () => {
      try {
        // Call the mutation
        await onUpdateUser({
          language,
          userId: userInfo.userId,
          fieldsToUpdate: {
            ...customerSubscriptionData,
            isFreeTrialOngoing: customerInfo.activeSubscriptions.length
              ? false
              : true,
          },
        });

        console.log('User subscription data updated successfully');
      } catch (error) {
        console.error('Failed to update user subscription data:', error);
      }
    };

    updateUserSubscription();
  }, [customerInfo, userInfo, language, onUpdateUser]);

  return { isPendingUpdateUser };
};
