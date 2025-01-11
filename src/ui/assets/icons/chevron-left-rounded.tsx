import { Path, Rect, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const ChevronLeftRounded = (props: ISvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={33} height={33} fill="none">
    <Rect
      width={31}
      height={31}
      x={-0.5}
      y={0.5}
      stroke="#D4D4D8"
      rx={15.5}
      transform="matrix(-1 0 0 1 31.017 .758)"
    />
    <Path
      stroke={props.fill || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.933 10.924 13.1 16.758l5.833 5.833"
    />
  </Svg>
);
