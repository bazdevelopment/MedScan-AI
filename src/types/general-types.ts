export type Nullable<T> = T | null | undefined;

export interface IUserInfo {
  userId: string;
  isOnboarded?: boolean;
  userName?: string;
  isFreeTrialOngoing?: boolean;
  activeSubscriptionsRevenue?: string[];
  allExpirationDatesRevenue?: Record<string, string>;
  allPurchaseDatesRevenue?: Record<string, string>;
  allPurchasedProductIdentifiersRevenue?: string[];
  firstSeenRevenue?: string | null;
}
