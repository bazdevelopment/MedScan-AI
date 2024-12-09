import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { type ISvgProps } from '@/types/svg-types';

export const EditIcon = (props: ISvgProps) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M15.198 3.52a1.612 1.612 0 0 1 2.223 2.336L6.346 16.421l-2.854.375 1.17-3.272L15.197 3.521zm3.725-1.322a3.612 3.612 0 0 0-5.102-.128L3.11 12.238a1 1 0 0 0-.253.388l-1.8 5.037a1 1 0 0 0 1.072 1.328l4.8-.63a1 1 0 0 0 .56-.267L18.8 7.304a3.612 3.612 0 0 0 .122-5.106zM12 17a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6z"
      />
    </Svg>
  );
};
