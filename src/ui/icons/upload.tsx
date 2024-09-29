import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const UploadIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 32 32 "
    {...props}
  >
    <Path
      stroke={props.color || '#fff'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7.785 13.514a6.667 6.667 0 1 0 3.37 12.9M24.036 13.514a6.667 6.667 0 1 1-3.37 12.9M24 13.333a8 8 0 0 0-16 0M11.377 18.587 16 13.95l4.755 4.718M16 25.333v-9.025"
    />
  </Svg>
);
