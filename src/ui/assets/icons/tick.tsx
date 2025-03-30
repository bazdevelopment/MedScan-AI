import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const Tick = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="none"
      stroke={props.color || 'black'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.7 14.3 9.6 19 20.3 5"
    />
  </Svg>
);
