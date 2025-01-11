import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const CornerBottomLeft = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={53}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      fillOpacity={0.2}
      fillRule="evenodd"
      d="M-25.608.527H7.028c14.696 0 26.608 11.965 26.608 26.725V60.03H19.584V27.25c0-6.964-5.621-12.61-12.556-12.61h-32.636V.527Z"
      clipRule="evenodd"
      opacity={0.64}
    />
  </Svg>
);
