import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const EditIcon = (props: ISvgProps) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none">
      <Path
        stroke={props.fill || '#18181B'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.956 17.552H18"
      />
      <Path
        stroke={props.fill || '#18181B'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.15 3.679a1.871 1.871 0 0 1 2.597-.253c.043.035 1.444 1.123 1.444 1.123a1.785 1.785 0 0 1 .6 2.486c-.028.046-7.948 9.952-7.948 9.952a1.416 1.416 0 0 1-1.09.527l-3.033.038-.684-2.892c-.095-.406 0-.834.264-1.162l7.85-9.82Z"
        clipRule="evenodd"
      />
      <Path
        stroke={props.fill || '#18181B'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m9.684 5.518 4.543 3.489"
      />
    </Svg>
  );
};
