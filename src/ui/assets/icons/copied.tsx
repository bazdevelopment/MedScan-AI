import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const CopiedIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    className="lucide lucide-clipboard-check-icon lucide-clipboard-check"
    {...props}
  >
    <Rect width={8} height={4} x={8} y={2} rx={1} ry={1} />
    <Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <Path d="m9 14 2 2 4-4" />
  </Svg>
);
