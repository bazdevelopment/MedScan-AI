import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const StopIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 48 48"
    {...props}
    fill="none"
  >
    <G data-name="Layer 2">
      <Path d="M0 0h48v48H0z" data-name="invisible box" />
      <Path
        fill={props.color}
        d="M24 2a22 22 0 1 0 22 22A21.9 21.9 0 0 0 24 2Zm8 29a1.1 1.1 0 0 1-1 1H17a1.1 1.1 0 0 1-1-1V17a1.1 1.1 0 0 1 1-1h14a1.1 1.1 0 0 1 1 1Z"
        data-name="icons Q2"
      />
    </G>
  </Svg>
);
