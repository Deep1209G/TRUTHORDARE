import { useMemo } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export interface UseDeviceHelperResult {
  width: number;
  height: number;
  isIOS: boolean;
  isAndroid: boolean;
  scaleWidth: (size: number) => number;
  scaleHeight: (size: number) => number;
}

export function useDeviceHelper(): UseDeviceHelperResult {
  const { width, height } = useWindowDimensions();

  return useMemo(
    () => ({
      width,
      height,
      isIOS: Platform.OS === 'ios',
      isAndroid: Platform.OS === 'android',
      scaleWidth: (size: number) => (size * width) / BASE_WIDTH,
      scaleHeight: (size: number) => (size * height) / BASE_HEIGHT,
    }),
    [width, height],
  );
}
