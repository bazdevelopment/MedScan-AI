/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Purchases, {
  type CustomerInfo,
  LOG_LEVEL,
  type PurchasesOffering,
  type PurchasesPackage,
} from 'react-native-purchases';

interface UseRevenueCatHook {
  offerings: PurchasesOffering | null;
  customerInfo: CustomerInfo | null;
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
  getCustomerInfo: () => Promise<void>;
  purchaseSubscription: (packageIdentifier: string) => Promise<void>;
}

export function useRevenueCat(): UseRevenueCatHook {
  const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const off = [
    ...(offerings?.annual ? [offerings.annual] : []),
    ...(offerings?.monthly ? [offerings.monthly] : []),
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //!the ios implementetion to be implemented
  if (Platform.OS === 'ios') {
    return {
      offerings: null,
      customerInfo: null,
      loading: false,
      error: 'RevenueCat is not supported on iOS',
      getProducts: async () => {},
      getCustomerInfo: async () => {},
      purchaseSubscription: async () => {},
    };
  }

  useEffect(() => {
    const initializeRevenueCat = async () => {
      setLoading(true);
      try {
        if (Platform.OS === 'android') {
          await Purchases.configure({
            apiKey: Env.REVENUE_CAT_API_KEYS_GOOGLE,
          });
        } else {
          await Purchases.configure({
            apiKey: '',
          });
        }

        await fetchCustomerInfo();
        await getProducts();

        console.log('RevenueCat initialized successfully');
        Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      } catch (error) {
        console.error('RevenueCat initialization failed:', error);
        setError('RevenueCat initialization failed');
      } finally {
        setLoading(false);
      }
    };

    initializeRevenueCat();
  }, []);

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const offerings = await Purchases.getOfferings();
      setOfferings(offerings.current);
    } catch (e) {
      console.log(e);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCustomerInfo = useCallback(async () => {
    setLoading(true);
    try {
      const info = await Purchases.getCustomerInfo();
      setCustomerInfo(info);
    } catch (e) {
      console.log(e);
      setError('Failed to fetch customer info');
    } finally {
      setLoading(false);
    }
  }, []);

  const purchaseSubscription = useCallback(
    async (packageIdentifier: string): Promise<CustomerInfo | undefined> => {
      // Find the selected package by identifier

      setLoading(true);
      try {
        if (!offerings) {
          await getProducts();
        }

        // Log in the user to associate the userId with the subscription
        // await Purchases.logIn(userId);

        // Find the selected package by identifier
        const selectedPackage = off.find(
          (pkg: PurchasesPackage) =>
            pkg.product.identifier === packageIdentifier,
        );
        if (selectedPackage) {
          const { customerInfo } =
            await Purchases.purchasePackage(selectedPackage);
          setCustomerInfo(customerInfo);

          return customerInfo;
        } else {
          throw new Error('Selected package not found');
        }
      } catch (e: any) {
        if (e.userCancelled) {
          alert('Transaction cancelled!');
        } else {
          alert('Something went wrong...');
          console.log(e);
          setError('Purchase failed');
        }
      } finally {
        setLoading(false);
      }
    },
    [offerings, getProducts],
  );

  return {
    offerings,
    customerInfo,
    loading,
    error,
    getProducts,
    getCustomerInfo: fetchCustomerInfo,
    purchaseSubscription,
  };
}
