import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const InstagramIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-instagram"
    {...props}
  >
    <Rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
    <Path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
  </Svg>
);
