import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const CalendarIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="transparent"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.11 10.162h17.823M16.459 14.068h.01M12.021 14.068h.01M7.575 14.068h.009M16.459 17.954h.01M12.021 17.954h.01M7.575 17.954h.009M16.06 2.758v3.29M7.982 2.758v3.29"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.255 4.337H7.788c-2.937 0-4.771 1.636-4.771 4.643v9.05c0 3.054 1.834 4.728 4.77 4.728h8.459c2.946 0 4.77-1.646 4.77-4.653V8.98c.01-3.007-1.815-4.643-4.76-4.643Z"
      clipRule="evenodd"
    />
  </Svg>
);
