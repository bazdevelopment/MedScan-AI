import { type Nullable } from '@/types/general-types';

export interface ISegmentedControl {
  options: ISegmentedControlOption[];
  selectedOption: ISegmentedControlOption;
  onOptionPress: (option: ISegmentedControlOption) => void;
  checkIsActive: (optionId: number) => boolean;
  tabActiveColor?: string;
  borderColor?: string;
  withBorder?: boolean;
  backgroundColor?: string;
  spacing?: number;
  tabInactiveColor?: string;
}

export interface ISegmentedControlOption {
  id: number;
  title: string;
  subtitle?: Nullable<string>;
  month: string;
}
