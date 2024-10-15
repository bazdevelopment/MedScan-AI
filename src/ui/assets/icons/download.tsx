import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const DownloadIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || '#10152C'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M2.25 9.003v6.747h13.5V9"
    />
    <Path
      stroke={props.color || '#10152C'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M12.375 8.625 9 12 5.625 8.625M8.997 2.25V12"
    />
  </Svg>
);
