import { type ReactElement } from 'react';

export interface ITabBarIcon {
  icon: ReactElement;
  focused: boolean;
  textClassName: string;
  title: string;
}
