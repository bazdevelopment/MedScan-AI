import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const MultiLanguage = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    className="lucide lucide-languages-icon lucide-languages"
    {...props}
  >
    <Path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" />
  </Svg>
);
