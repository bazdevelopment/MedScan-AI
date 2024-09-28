import { type TextProps, type TextStyle } from 'react-native';

export interface IGradientText extends TextProps {
  colors: string[];
  style?: TextStyle;
}
