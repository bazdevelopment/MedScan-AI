import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const PlayerIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={800}
    height={800}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path d="M28 3H4c-.6 0-1 .4-1 1v16c0 .6.4 1 1 1h24c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1zm-9.4 9.8-4 3c-.2.1-.4.2-.6.2-.2 0-.3 0-.4-.1-.4-.2-.6-.5-.6-.9V9c0-.4.2-.7.6-.9.3-.2.7-.1 1 .1l4 3c.3.2.4.5.4.8s-.1.6-.4.8zM10 29c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
    <Path d="M8 27H4c-.6 0-1-.4-1-1s.4-1 1-1h4c.6 0 1 .4 1 1s-.4 1-1 1zM28 27H15c-.6 0-1-.4-1-1s.4-1 1-1h13c.6 0 1 .4 1 1s-.4 1-1 1z" />
  </Svg>
);
