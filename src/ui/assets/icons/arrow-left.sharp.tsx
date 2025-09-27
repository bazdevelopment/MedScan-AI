import { ISvgProps } from '@/types/svg-types';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ArrowLeftSharp = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-arrow-left-icon lucide-arrow-left"
    {...props}
  >
    <Path d="m12 19-7-7 7-7M19 12H5" />
  </Svg>
);
