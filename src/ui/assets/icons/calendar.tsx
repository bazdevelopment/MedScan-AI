import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const CalendarIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    className="lucide lucide-calendar-days"
    {...props}
  >
    <Path d="M8 2v4M16 2v4" />
    <Rect width={18} height={18} x={3} y={4} rx={2} />
    <Path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </Svg>
);
