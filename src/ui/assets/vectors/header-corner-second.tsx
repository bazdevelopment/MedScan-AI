import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const HederCornerSecond = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || '#868EFD'}
      strokeOpacity={0.5}
      strokeWidth={11.488}
      d="M57.682 63.385V27.809c0-11.789-9.557-21.345-21.346-21.345H.76"
    />
  </Svg>
);
