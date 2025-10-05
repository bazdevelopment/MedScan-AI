import colors from '@/ui/colors';
import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

export const CrownIllustration = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={45}
    height={45}
    fill="none"
    viewBox="0 0 45 45"
    {...props}
  >
    <Path
      fill={colors.primary[900]}
      d="m5.197 28.415-1.64-15.748c-.12-1.163 1.233-1.886 2.133-1.14l7.217 5.986a1.793 1.793 0 0 0 2.584-.313l6.697-9.05a1.666 1.666 0 0 1 2.77.136l5.779 9.661a1.791 1.791 0 0 0 2.541.564l7.768-5.251c.97-.655 2.245.197 2.01 1.343l-3.17 15.512-34.69-1.7ZM37.65 38.7l-31.07-1.522a1.812 1.812 0 0 1-1.72-1.898l.194-3.973 34.689 1.7-.195 3.973a1.812 1.812 0 0 1-1.898 1.72Z"
    />
  </Svg>
);
