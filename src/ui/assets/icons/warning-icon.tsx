import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const WarningIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill="#FDD732"
      fillRule="evenodd"
      d="M.877 19.496A1 1 0 0 0 1.741 21h21.018a1 1 0 0 0 .864-1.504L13.113 1.481a1 1 0 0 0-1.727 0L.877 19.496Z"
      clipRule="evenodd"
    />
    <Path
      fill="#1F1E2F"
      fillRule="evenodd"
      d="M13.25 9a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0V9Zm.25 8a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
