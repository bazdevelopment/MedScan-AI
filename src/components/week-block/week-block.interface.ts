import { type TPositions } from '@/constants/positions';
import { type Nullable } from '@/types/general-types';

import { type ISegmentedControlOption } from '../segmented-control/segmented-control.interface';

export interface IWeekBlock {
  onScrollToIndex: (indexToScroll: number) => void;
  weekOffset: number;
  initialDayFocused: Nullable<ISegmentedControlOption>;
  changeWeekOffset: (direction: TPositions) => void;
  weekNumber: number;
  currentMonth: string;
  interval: string;
  currentYear: number;
  segmentedDays: ISegmentedControlOption[];
  reportSections: any;
  className: string;
}
