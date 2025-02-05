import { type ReactNode } from 'react';

import { type IOnboardingCollectedData } from '@/app/onboarding';
import { type ICollectedData } from '@/core/flows/upload-file-flow/upload-file-flow.interface';

export interface IFlowModal {
  onSubmitCollectedData: (data: object) => void;
}

export interface IFlow {
  currentScreenIndex: number;
  onGoNext: (data: ICollectedData | IOnboardingCollectedData) => void;
  onGoBack: () => void;
  onFinish: (data: ICollectedData | IOnboardingCollectedData) => void;
  collectedData: ICollectedData | IOnboardingCollectedData;
  children: ReactNode;
  onSkip: () => void;
  resetFlow: () => void;
  onPending: boolean;
}
