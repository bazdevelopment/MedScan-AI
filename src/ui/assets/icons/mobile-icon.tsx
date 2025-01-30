import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const MobileIcon = (_props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={81}
    height={81}
    fill="none"
    // {...props}
  >
    <Rect
      width={78}
      height={78}
      x={1.5}
      y={1.839}
      stroke="#fff"
      strokeOpacity={0.6}
      strokeWidth={2}
      rx={39}
    />
    <G fill="#fff" clipPath="url(#a)">
      <Path d="M47.154 20.839H33.845a4.259 4.259 0 0 0-4.254 4.255v31.49a4.259 4.259 0 0 0 4.254 4.255h13.31a4.259 4.259 0 0 0 4.254-4.255v-31.49a4.26 4.26 0 0 0-4.255-4.255Zm2.437 35.745a2.439 2.439 0 0 1-2.437 2.437H33.845a2.439 2.439 0 0 1-2.436-2.437v-31.49a2.439 2.439 0 0 1 2.436-2.437h13.31a2.439 2.439 0 0 1 2.436 2.437v31.49Z" />
      <Path d="M43.227 24.476h-5.454a.91.91 0 1 0 0 1.818h5.454a.91.91 0 0 0 0-1.818Zm-.91 30.909a1.818 1.818 0 1 1-3.635 0 1.818 1.818 0 0 1 3.636 0Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M20.5 20.839h40v40h-40z" />
      </ClipPath>
    </Defs>
  </Svg>
);
