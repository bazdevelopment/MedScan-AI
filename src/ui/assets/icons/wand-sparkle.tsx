import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const WandSparkle = (props: ISvgProps) => (
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
    className="lucide lucide-wand-sparkles"
    {...props}
  >
    <Path
      stroke={props.withLinearGradient ? 'url(#a)' : '#7CD0FC'}
      d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72M14 7l3 3M5 6v4M19 14v4M10 2v2M7 8H3M21 16h-4M11 3H9"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={4.875}
        x2={25.685}
        y1={3.25}
        y2={12.576}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#7CD0FC" />
        <Stop offset={1} stopColor="#A935F8" />
      </LinearGradient>
    </Defs>
  </Svg>
);
