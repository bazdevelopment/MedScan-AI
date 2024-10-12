import { type ReactNode } from 'react';

export interface IFlowModal {
  onSubmitCollectedData: (data: object) => void;
}

export interface IFlow {
  currentScreenIndex: number;
  onGoNext: (data: object) => void;
  onGoBack: () => void;
  onFinish: () => void;
  collectedData: object;
  children: ReactNode;
}
