import * as Application from 'expo-application';
import * as Device from 'expo-device';
import { Dimensions, Platform } from 'react-native';

export const getUniqueDeviceIdentifier = (): string => {
  const deviceInfo = {
    deviceName: Device.deviceName ?? '',
    modelName: Device.modelName ?? '',
    brand: Device.brand ?? '',
    osVersion: Device.osVersion ?? '',
    platformOs: Platform.OS,
    totalMemory: Device.totalMemory ?? '',
    osBuildId: Device.osBuildId ?? '',
    bundleId: Application.applicationId,
    buildVersion: Application.nativeBuildVersion,
    screenDimensions: `${Dimensions.get('window').width}x${Dimensions.get('window').height}`,
  };

  const deviceInfoString = Object.values(deviceInfo).join('_');
  return deviceInfoString;
};
