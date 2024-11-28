import { Path, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const ChevronRightRounded = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={props.width}
    height={props.height}
    viewBox="0 0 512 512"
    {...props}
  >
    <Path d="M256 512c141.391 0 256-114.609 256-256S397.391 0 256 0 0 114.609 0 256s114.609 256 256 256zm0-472c119.297 0 216 96.703 216 216s-96.703 216-216 216S40 375.297 40 256 136.703 40 256 40z" />
    <Path d="M212.688 363.312c6.25 6.25 16.375 6.25 22.625 0l96-96c6.25-6.25 6.25-16.375 0-22.625l-96-96C232.188 145.562 228.094 144 224 144s-8.188 1.562-11.312 4.688c-6.25 6.25-6.25 16.375 0 22.625L297.375 256l-84.688 84.688c-6.249 6.25-6.249 16.374.001 22.624z" />
  </Svg>
);
