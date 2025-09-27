import { ISvgProps } from '@/types/svg-types';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ArrowRightSharp = (props: ISvgProps) => (
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
    className="lucide lucide-arrow-right-icon lucide-arrow-right"
    {...props}
  >
    <Path d="M5 12h14M12 5l7 7-7 7" />
  </Svg>
);
