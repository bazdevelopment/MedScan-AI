import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const MailIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || '#000'}
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M2 19.5h20v-15H2v15Z"
    />
    <Path
      stroke={props.color || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M2 4.5 12 12l10-7.5"
    />
    <Path
      stroke={props.color || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M12 4.5H2V12M22 12V4.5H12"
    />
  </Svg>
);
