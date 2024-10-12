import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const ShareIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || '#10152C'}
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M13.125 6a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75ZM4.875 10.875a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z"
    />
    <Path
      stroke={props.color || '#10152C'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M11.25 5.09 6.502 7.967M6.502 9.961l5.003 2.957"
    />
    <Path
      stroke={props.color || '#10152C'}
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M13.125 12a1.875 1.875 0 1 1 0 3.75 1.875 1.875 0 0 1 0-3.75Z"
    />
  </Svg>
);
