import * as React from 'react';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const ReportIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.25}
    className="lucide lucide-file-text"
    {...props}
  >
    <Path
      d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
      stroke={props.withLinearGradient ? 'url(#a)' : props.color}
    />
    <Path
      d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"
      stroke={props.withLinearGradient ? 'url(#b)' : props.color}
    />

    {true && (
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
        <LinearGradient
          id="b"
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
    )}
  </Svg>
);
