import { Env } from '@env';
import { Platform } from 'react-native';
import Purchases, {
  type CustomerInfo,
  LOG_LEVEL,
  type PurchasesOffering,
  type PurchasesPackage,
} from 'react-native-purchases';
import { createMutation, createQuery } from 'react-query-kit';

import Toast from '@/components/toast';
import { translate } from '@/core';
import { wait } from '@/core/utilities/wait';

import { queryClient } from '../common';

// Query to fetch offerings
export const useGetOfferings = createQuery<PurchasesOffering | null, Error>({
  queryKey: ['subscription-offerings'],
  fetcher: async () => {
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  },
});

// Query to fetch customer info
export const useGetCustomerInfo = createQuery<CustomerInfo | null, Error>({
  queryKey: ['subscription-customerInfo'],
  fetcher: async () => {
    const info = await Purchases.getCustomerInfo();
    return info;
  },
});

//purchase subscription mutation
export const usePurchaseSubscription = createMutation<
  CustomerInfo | undefined,
  { packageIdentifier: string },
  Error
>({
  mutationFn: async ({ packageIdentifier }: { packageIdentifier: string }) => {
    const offerings = await Purchases.getOfferings();
    const monthlyAndAnnualOfferings = [
      ...(offerings.current?.annual ? [offerings.current.annual] : []),
      ...(offerings.current?.monthly ? [offerings.current.monthly] : []),
    ];

    const selectedPackage = monthlyAndAnnualOfferings.find(
      (pkg: PurchasesPackage) => pkg.product.identifier === packageIdentifier,
    );

    if (!selectedPackage) {
      return Toast.error('Kindly choose a subscription plan to continue!', {
        closeButton: true,
        duration: Infinity,
      });
    }

    const { customerInfo } = await Purchases.purchasePackage(selectedPackage);
    return customerInfo;
  },
  onSuccess: () => {
    Toast.success(translate('alerts.subscriptionActivated'));

    queryClient.invalidateQueries({ queryKey: ['user-info'] });
    queryClient.invalidateQueries({ queryKey: ['subscription-customerInfo'] });
  },
  onError: (error) => {
    if (error.userCancelled) {
      //wait is needed because there is a conflict between android subscription modal and toast
      wait(500).then(() =>
        Toast.warning(translate('alerts.subscriptionCancelledByUser'), {
          closeButton: true,
          duration: 8000,
        }),
      );
    } else {
      wait(500).then(() =>
        Toast.error(translate('alerts.subscriptionActivationFailed'), {
          closeButton: true,
          duration: 8000,
        }),
      );
      console.error(error);
    }
  },
});

// Query to initialize RevenueCat
export const useInitializeRevenueCat = (userId: string) =>
  createQuery<
    boolean, // Return type (whether initialization succeeded)
    void, // No input variables
    Error // Error type
  >({
    queryKey: ['initializeRevenueCat'],
    // enabled: !!userId,
    fetcher: async () => {
      if (Platform.OS === 'android') {
        await Purchases.configure({
          appUserID: userId,
          apiKey: Env.EXPO_PUBLIC_REVENUE_CAT_API_KEYS_GOOGLE as string,
        });
      } else {
        await Purchases.configure({
          appUserID: userId,
          apiKey: Env.EXPO_PUBLIC_REVENUE_CAT_API_KEYS_APPLE as string,
        });
      }

      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      console.log('RevenueCat initialized successfully');
      return true; // Indicate successful initialization
    },
  })();

// Mutation to restore purchases
export const useRestorePurchases = createMutation<CustomerInfo, void, Error>({
  mutationFn: async () => {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo;
  },
  onSuccess: (customerInfo) => {
    queryClient.invalidateQueries({ queryKey: ['subscription-customerInfo'] });

    console.log('Purchases restored successfully:', customerInfo);
    // Optionally, you can update the customer info in your app state here
  },
  onError: (error) => {
    console.error('Failed to restore purchases:', error);
    // Handle the error (e.g., show a toast or alert)
  },
});
