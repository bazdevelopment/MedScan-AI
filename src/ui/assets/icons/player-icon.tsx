import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const PlayerIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="#fff" d="M8.783 6.887v9.79l9.17-4.895-9.17-4.895Z" />
      <Path
        fill="#DB2B42"
        d="M12 .018C5.373.018 0 5.382 0 12c0 6.618 5.373 11.982 12 11.982S24 18.618 24 12C24 5.382 18.627.018 12 .018Zm-3.352 6.87 9.17 4.895-9.17 4.895v-9.79Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
