import { type ReactNode } from 'react';

import { type ICollectedData } from '@/core/flows/upload-file-flow/upload-file-flow.interface';

export interface IFlowModal {
  onSubmitCollectedData: (data: object) => void;
}

export interface IFlow {
  currentScreenIndex: number;
  onGoNext: (data: ICollectedData) => void;
  onGoBack: () => void;
  onFinish: () => void;
  collectedData: ICollectedData;
  children: ReactNode;
}
