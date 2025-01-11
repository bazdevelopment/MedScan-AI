import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const ReportIcon = (props: ISvgProps) => (
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
      d="M15.716 16.74h-7.22M15.716 12.554h-7.22M11.252 8.377H8.497"
    />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.focused ? 2 : 1.5}
      d="M15.909 3.267 8.22 3.27c-2.76.017-4.469 1.833-4.469 4.603v9.196c0 2.784 1.722 4.607 4.506 4.607l7.689-.003c2.76-.017 4.47-1.834 4.47-4.604V7.874c0-2.784-1.723-4.607-4.507-4.607Z"
      clipRule="evenodd"
    />
  </Svg>
);
