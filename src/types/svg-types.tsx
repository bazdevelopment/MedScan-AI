import { type SvgProps } from 'react-native-svg';

export interface ISvgProps extends SvgProps {
  xmlns?: string;
  xmlSpace?: string;
  withLinearGradient?: boolean;
  top?: number;
  isRead?: boolean;
}
