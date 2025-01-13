import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const EyeIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 20 21"
    fill="none"
    {...props}
  >
    <G fill="#7982FD" clipPath="url(#a)">
      <Path d="M19.892 7.85C18.6 5.743 15.66 2.211 10.5 2.211c-5.16 0-8.1 3.532-9.392 5.637a4.09 4.09 0 0 0 0 4.302C2.4 14.256 5.34 17.787 10.5 17.787c5.16 0 8.1-3.531 9.392-5.636a4.09 4.09 0 0 0 0-4.302Zm-1.42 3.428c-1.11 1.805-3.623 4.843-7.972 4.843-4.35 0-6.862-3.038-7.972-4.843a2.431 2.431 0 0 1 0-2.556c1.11-1.805 3.623-4.843 7.972-4.843 4.35 0 6.862 3.034 7.972 4.843a2.432 2.432 0 0 1 0 2.556Z" />
      <Path d="M10.5 5.833a4.167 4.167 0 1 0 0 8.333 4.167 4.167 0 0 0 0-8.333Zm0 6.667a2.5 2.5 0 1 1 0-4.999 2.5 2.5 0 0 1 0 4.999Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h20v20H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
