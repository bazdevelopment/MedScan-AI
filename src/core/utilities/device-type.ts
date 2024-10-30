import { Platform } from 'react-native';

export const DEVICE_TYPE = {
  IOS: Platform.OS === 'ios',
  ANDROID: Platform.OS === 'android',
};
