import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const DownloadIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#7982FD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.602 13.26V3.228M13.032 10.82l-2.43 2.44-2.43-2.44"
    />
    <Path
      stroke="#7982FD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.462 7.17h.778a3.07 3.07 0 0 1 3.07 3.071v4.07a3.062 3.062 0 0 1-3.063 3.063H5.964a3.071 3.071 0 0 1-3.07-3.071v-4.07A3.062 3.062 0 0 1 5.955 7.17h.785"
    />
  </Svg>
);
