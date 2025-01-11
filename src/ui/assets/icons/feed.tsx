import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const Feed = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.focused ? 2 : 1.5}
      d="M9.157 21.288v-3.067c0-.78.636-1.414 1.424-1.419h2.886c.792 0 1.433.636 1.433 1.42v3.075c0 .663.534 1.204 1.203 1.22h1.924c1.918 0 3.473-1.54 3.473-3.439v0-8.724a2.44 2.44 0 0 0-.962-1.904l-6.58-5.248a3.18 3.18 0 0 0-3.945 0L3.462 8.459a2.42 2.42 0 0 0-.962 1.905v8.714c0 1.9 1.555 3.439 3.473 3.439h1.924c.685 0 1.241-.55 1.241-1.229v0"
    />
  </Svg>
);
