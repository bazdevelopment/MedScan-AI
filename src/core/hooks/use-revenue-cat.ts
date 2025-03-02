/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Purchases, {
  type CustomerInfo,
  LOG_LEVEL,
  type PurchasesOffering,
} from 'react-native-purchases';

interface UseRevenueCatHook {
  offerings: PurchasesOffering | null;
  customerInfo: CustomerInfo | null;
  getProducts: () => Promise<void>;
  getCustomerInfo: () => Promise<void>;
  purchaseSubscription: () => Promise<void>;
}

export function useRevenueCat(): UseRevenueCatHook {
  const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const off = [
    ...(offerings?.annual ? [offerings.annual] : []),
    ...(offerings?.monthly ? [offerings.monthly] : []),
  ];

  useEffect(() => {
    const initializeRevenueCat = async () => {
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
      }
    };

    initializeRevenueCat();
  }, []);

  const getProducts = useCallback(async () => {
    try {
      const offerings = await Purchases.getOfferings();
      setOfferings(offerings.current);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchCustomerInfo = useCallback(async () => {
    try {
      const info = await Purchases.getCustomerInfo();
      setCustomerInfo(info);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const purchaseSubscription = useCallback(async (): Promise<CustomerInfo> => {
    // Find the selected package by identifier

    try {
      if (!offerings) {
        await getProducts();
      }
      const pack = offerings?.availablePackages[0];
      if (pack) {
        const { customerInfo } = await Purchases.purchasePackage(pack);
        setCustomerInfo(customerInfo);

        return customerInfo;
      }
    } catch (e: any) {
      if (e.userCancelled) {
        alert('Transaction cancelled!');
      } else {
        alert('Something went wrong...');
        console.log(e);
      }
    }
  }, [offerings, getProducts]);

  return {
    offerings,
    customerInfo,
    getProducts,
    getCustomerInfo: fetchCustomerInfo,
    purchaseSubscription,
  };
}
