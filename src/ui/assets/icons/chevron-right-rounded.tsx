import { Path, Rect, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const ChevronRightRounded = (props: ISvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={33} height={33} fill="none">
    <Rect
      width={31}
      height={31}
      x={0.517}
      y={1.258}
      stroke="#D4D4D8"
      rx={15.5}
    />
    <Path
      stroke={props.fill || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m13.1 10.924 5.834 5.834L13.1 22.59"
    />
  </Svg>
);
