import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const CornerTopRight = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={51}
    height={31}
    fill="white"
    {...props}
  >
    <Path
      fillOpacity={0.2}
      fillRule="evenodd"
      d="M72.726 21.588 41.2 30.035c-14.195 3.803-28.798-4.67-32.618-18.927L.099-20.554l13.573-3.637L22.156 7.47c1.803 6.727 8.694 10.726 15.392 8.931l31.525-8.447 3.653 13.633Z"
      clipRule="evenodd"
      opacity={0.64}
    />
  </Svg>
);
