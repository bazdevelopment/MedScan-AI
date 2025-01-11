import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const HeaderCornerThird = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={63}
    height={64}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || '#868EFD'}
      strokeOpacity={0.5}
      strokeWidth={11.488}
      d="M5.92 63.542V27.966c0-11.789 9.558-21.345 21.346-21.345h35.576"
    />
  </Svg>
);
