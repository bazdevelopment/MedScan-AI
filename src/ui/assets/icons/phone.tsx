import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const PhoneIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#43567C"
        d="M16.56 1.053H7.44c-1.23 0-2.229.997-2.229 2.228V22.45c0 1.231.998 2.229 2.229 2.229h9.122c1.23 0 2.228-.998 2.228-2.229V3.281c0-1.23-.997-2.228-2.228-2.228Z"
      />
      <Path
        fill="#8CC0F3"
        d="M17.642 3.993v16.935a.381.381 0 0 1-.38.382H6.738a.381.381 0 0 1-.38-.382V3.993a.381.381 0 0 1 .38-.383H17.26a.382.382 0 0 1 .38.383Z"
      />
      <Path
        fill="#2F3A5A"
        d="M13.575 2.473h-3.149a.188.188 0 0 1 0-.375h3.15a.188.188 0 0 1 0 .375ZM13.21 22.317h-2.42a.171.171 0 0 0-.172.172v.928c0 .095.077.172.172.172h2.42a.171.171 0 0 0 .171-.172v-.928a.171.171 0 0 0-.171-.172Z"
      />
      <Path
        fill="#E1E6E9"
        d="M16.607 3.61 6.358 20.757V18.08l8.648-14.47h1.6Zm1.035.822v1.336L8.353 21.31h-.799L17.642 4.432Z"
        opacity={0.5}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .865h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
