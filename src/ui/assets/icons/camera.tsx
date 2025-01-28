import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const Camera = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    viewBox="0 0 21 21"
  >
    <Path
      stroke={props.fill || '#fff'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.034 3.798c.841.335 1.099 1.502 1.443 1.877.344.375.837.502 1.11.502A2.622 2.622 0 0 1 18.208 8.8v4.83a3.517 3.517 0 0 1-3.517 3.516H6.309a3.517 3.517 0 0 1-3.517-3.517V8.8a2.622 2.622 0 0 1 2.622-2.622c.272 0 .765-.127 1.11-.502.344-.375.6-1.542 1.442-1.877.843-.335 4.226-.335 5.068 0Z"
      clipRule="evenodd"
    />
    <Path
      stroke={props.fill || '#fff'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.08 8.339h.007"
    />
    <Path
      stroke={props.fill || '#fff'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.15 11.362a2.649 2.649 0 1 0-5.298 0 2.649 2.649 0 0 0 5.297 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
