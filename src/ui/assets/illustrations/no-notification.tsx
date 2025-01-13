import * as React from 'react';
import Svg, { Image, type SvgProps } from 'react-native-svg';

export const NoNotification = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    width={450}
    height={450}
    viewBox="0 0 450 450"
    {...props}
  >
    <Image width={450} height={450} />
  </Svg>
);
