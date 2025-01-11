import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const Settings = (props: ISvgProps) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      fill="none"
      {...props}
    >
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props.focused ? 2 : 1.5}
        d="M10.33 17.11h-6.3M13.14 7.417h6.301"
      />
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props.focused ? 2 : 1.5}
        d="M8.726 7.363a2.355 2.355 0 0 0-2.363-2.346A2.355 2.355 0 0 0 4 7.363a2.355 2.355 0 0 0 2.363 2.346 2.355 2.355 0 0 0 2.363-2.346ZM20 17.07a2.354 2.354 0 0 0-2.363-2.346 2.355 2.355 0 0 0-2.364 2.346 2.355 2.355 0 0 0 2.364 2.347A2.354 2.354 0 0 0 20 17.07Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
