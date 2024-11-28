import { Path, Svg } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const ChevronLeftRounded = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={props.width}
    height={props.height}
    viewBox="0 0 512 512"
    {...props}
  >
    <Path d="M256 0C114.609 0 0 114.609 0 256s114.609 256 256 256 256-114.609 256-256S397.391 0 256 0zm0 472c-119.297 0-216-96.703-216-216S136.703 40 256 40s216 96.703 216 216-96.703 216-216 216z" />
    <Path d="M305.312 148.688c-6.25-6.25-16.375-6.25-22.625 0l-96 96c-6.25 6.25-6.25 16.375 0 22.625l96 96C285.812 366.438 289.906 368 294 368s8.188-1.562 11.312-4.688c6.25-6.25 6.25-16.375 0-22.625L220.625 256l84.688-84.688c6.249-6.25 6.249-16.374-.001-22.624z" />
  </Svg>
);
