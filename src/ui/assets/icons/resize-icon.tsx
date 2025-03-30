import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const ResizeIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fill={props.color || 'black'}
      fillRule="evenodd"
      d="M28 30a2 2 0 1 1 .001-4.001A2 2 0 0 1 28 30Zm-3.858-3H7.858A3.985 3.985 0 0 0 5 24.142V7.858A3.983 3.983 0 0 0 7.858 5h16.284A3.983 3.983 0 0 0 27 7.858v16.284A3.985 3.985 0 0 0 24.142 27ZM4 30a2 2 0 1 1 .001-4.001A2 2 0 0 1 4 30ZM2 4a2 2 0 1 1 4.001.001A2 2 0 0 1 2 4Zm26-2a2 2 0 1 1-.001 4.001A2 2 0 0 1 28 2Zm1 22.142V7.858A3.99 3.99 0 0 0 32 4a4 4 0 0 0-4-4 3.99 3.99 0 0 0-3.858 3H7.858A3.99 3.99 0 0 0 4 0a4 4 0 0 0-4 4 3.99 3.99 0 0 0 3 3.858v16.284A3.99 3.99 0 0 0 0 28a4 4 0 0 0 4 4 3.988 3.988 0 0 0 3.858-3h16.284A3.988 3.988 0 0 0 28 32a4 4 0 0 0 4-4 3.99 3.99 0 0 0-3-3.858Z"
    />
  </Svg>
);
