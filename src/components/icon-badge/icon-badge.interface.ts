import { type ReactElement } from 'react';

export interface IIconBadge {
  icon: ReactElement;
  badgeValue: number;
  className?: string;
  badgeContainerClassName?: string;
  badgeTextClassName?: string;
  showBadgeValue?: boolean;
}
