import { useState } from 'react';

import { type ISegmentedControlOption } from '@/components/segmented-control/segmented-control.interface';

/**
 * Custom hook used to handle the segmented tab selection
 */
export const useSegmentedSelection = (
  initialDayFocused: ISegmentedControlOption,
) => {
  const [selectedOption, setSelectedOption] =
    useState<ISegmentedControlOption | null>(initialDayFocused);

  const checkIsActive = (optionId: number) => {
    return selectedOption?.id === optionId;
  };

  const handleChangeSelection = (option: ISegmentedControlOption | null) => {
    setSelectedOption(option);
  };

  return {
    checkIsActive,
    handleChangeSelection,
    selectedOption,
  };
};
