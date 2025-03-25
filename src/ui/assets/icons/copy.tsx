import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

const CopyIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-copy"
    {...props}
  >
    <Rect width={14} height={14} x={8} y={8} rx={2} ry={2} />
    <Path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </Svg>
);
export default CopyIcon;
