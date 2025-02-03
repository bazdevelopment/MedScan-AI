import { Dimensions } from 'react-native';

interface DeviceSizeCategory {
  isVerySmallDevice: boolean;
  isSmallDevice: boolean;
  isMediumDevice: boolean;
  isLargeDevice: boolean;
  screenWidth: number;
  screenHeight: number;
}

const getDeviceSizeCategory = (): DeviceSizeCategory => {
  const { width, height } = Dimensions.get('window');

  return {
    isVerySmallDevice: width < 360,
    isSmallDevice: width >= 360 && width < 400,
    isMediumDevice: width >= 400 && width < 768,
    isLargeDevice: width >= 768,
    screenWidth: width,
    screenHeight: height,
  };
};

export default getDeviceSizeCategory;
