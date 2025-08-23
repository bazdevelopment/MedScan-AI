import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const CheckIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-check-icon lucide-check"
    {...props}
  >
    <Path d="M20 6 9 17l-5-5" />
  </Svg>
);
