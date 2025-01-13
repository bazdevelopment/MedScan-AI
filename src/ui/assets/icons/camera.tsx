import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const Camera = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || '#7982FD'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.79 4.932c1.01.402 1.32 1.802 1.732 2.252.413.45 1.004.603 1.331.603A3.147 3.147 0 0 1 22 10.933v5.795a4.22 4.22 0 0 1-4.22 4.22H7.72a4.22 4.22 0 0 1-4.22-4.22v-5.795a3.147 3.147 0 0 1 3.147-3.146c.326 0 .917-.153 1.331-.603.413-.45.721-1.85 1.731-2.252 1.011-.402 5.071-.402 6.081 0Z"
      clipRule="evenodd"
    />
    <Path
      stroke={props.color || '#7982FD'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.245 10.38h.01"
    />
    <Path
      stroke={props.color || '#7982FD'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.929 14.01a3.179 3.179 0 1 0-6.357-.002 3.179 3.179 0 0 0 6.357.001Z"
      clipRule="evenodd"
    />
  </Svg>
);
