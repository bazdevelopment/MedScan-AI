import * as React from 'react';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const Feed = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.withLinearGradient ? 'url(#a)' : props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M4.875 9.75v13h16.25v-13L13 3.25l-8.125 6.5Z"
    />
    <Path
      stroke={props.withLinearGradient ? 'url(#b)' : props.color}
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M10.292 15.708v7.042h5.416v-7.042h-5.416Z"
    />
    <Path
      stroke={props.withLinearGradient ? 'url(#c)' : props.color}
      strokeLinecap="round"
      strokeWidth={1.2}
      d="M4.875 22.75h16.25"
    />
    {props.withLinearGradient && (
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
          x1={10.292}
          x2={17.404}
          y1={15.708}
          y2={18.651}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7CD0FC" />
          <Stop offset={1} stopColor="#A935F8" />
        </LinearGradient>
        <LinearGradient
          id="c"
          x1={4.875}
          x2={5.198}
          y1={22.75}
          y2={25.573}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7CD0FC" />
          <Stop offset={1} stopColor="#A935F8" />
        </LinearGradient>
      </Defs>
    )}
  </Svg>
);
