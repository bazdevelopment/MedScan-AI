export interface IStoreDeviceTokenResponse {
  success: boolean;
  token: string;
}

export interface IGlobalNotificationsResponse {
  success: boolean;
  totalTokens: number;
  results: Record<string, any>[];
}

export interface IMobileDeviceInfo {
  deviceToken: string;
  platform: string;
  version: string;
  deviceName?: string;
  deviceModel?: string;
  deviceBrand?: string;
}
