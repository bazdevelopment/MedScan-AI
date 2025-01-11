import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const LogoutIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.03 7.946v-.933a3.685 3.685 0 0 0-3.684-3.685H6.47a3.685 3.685 0 0 0-3.684 3.685v11.13a3.685 3.685 0 0 0 3.684 3.685h4.885a3.675 3.675 0 0 0 3.675-3.674v-.943M21.824 12.578H9.784M18.896 9.663l2.928 2.915-2.928 2.916"
    />
  </Svg>
);
