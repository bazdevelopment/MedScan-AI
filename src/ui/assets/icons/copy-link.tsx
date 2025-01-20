import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const CopyLink = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    viewBox="0 0 25 25"
    {...props}
  >
    <Path
      fill={props.color || '#18181B'}
      d="m13.748 17.186-2.718 2.718a4.19 4.19 0 0 1-5.926-5.923l2.718-2.72a.834.834 0 0 0-1.179-1.179l-2.717 2.72a5.856 5.856 0 1 0 8.284 8.28l2.718-2.718a.833.833 0 0 0-1.178-1.178h-.002Zm6.748-12.67a5.815 5.815 0 0 0-4.14-1.717 5.818 5.818 0 0 0-4.14 1.714L9.494 7.232a.833.833 0 0 0 1.178 1.179l2.72-2.718a4.16 4.16 0 0 1 2.962-1.228 4.19 4.19 0 0 1 2.961 7.152l-2.718 2.718a.834.834 0 0 0 1.18 1.179l2.717-2.716a5.864 5.864 0 0 0 .002-8.282Z"
    />
    <Path
      fill={props.color || '#18181B'}
      d="m14.121 9.709-5 4.999a.833.833 0 1 0 1.179 1.178l5-5A.833.833 0 0 0 14.12 9.71Z"
    />
  </Svg>
);
