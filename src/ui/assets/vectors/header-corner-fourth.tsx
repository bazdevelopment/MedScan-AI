import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const HeaderCornerFourth = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || '#868EFD'}
      strokeOpacity={0.5}
      strokeWidth={11.488}
      d="M57.764-45.299v35.576c0 11.789-9.557 21.345-21.346 21.345H.842"
    />
  </Svg>
);
