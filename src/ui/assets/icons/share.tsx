import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const ShareIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    viewBox="0 0 24 24"
    color={props.color || '#18181B'}
    {...props}
  >
    <Path
      fill={props.color || '#18181B'}
      d="M16.012 12.518a3.497 3.497 0 0 0-2.88 1.518l-4.885-2.205a3.432 3.432 0 0 0 .004-2.617l4.878-2.217a3.497 3.497 0 1 0-.621-1.983c.003.198.023.395.06.59L7.383 7.96a3.503 3.503 0 1 0-.011 5.123l5.198 2.347a3.562 3.562 0 0 0-.06.589 3.502 3.502 0 1 0 3.502-3.501Zm0-9.505a2.001 2.001 0 1 1 .002 4.002 2.001 2.001 0 0 1-.002-4.002ZM5.007 12.518a2.002 2.002 0 1 1-.001-4.004 2.002 2.002 0 0 1 .001 4.004Zm11.005 5.502a2.001 2.001 0 1 1 0-4.002 2.001 2.001 0 0 1 0 4.002Z"
    />
  </Svg>
);
