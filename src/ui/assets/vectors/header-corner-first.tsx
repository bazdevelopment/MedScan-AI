import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const HederCornerFirst = (props: ISvgProps) => (
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
      d="M5.839.542v35.576c0 11.788 9.556 21.345 21.345 21.345H62.76"
    />
  </Svg>
);
