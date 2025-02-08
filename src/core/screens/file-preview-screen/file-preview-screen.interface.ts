import { type ICollectedData } from '@/core/flows/upload-file-flow/upload-file-flow.interface';

export interface IFilePreviewScreen {
  collectedData: ICollectedData;
  goToNextScreen: () => void;
  resetFlow: () => void;
  currentScreenIndex: number;
  totalSteps: number;
}
