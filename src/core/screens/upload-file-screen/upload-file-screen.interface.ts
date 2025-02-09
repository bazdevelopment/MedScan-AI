import { type ReactElement } from 'react';

export interface IGalleryOption {
  label: string;
  id: number;
  icon: ReactElement;
  title: string;
}

export interface IUploadFileOptions {
  options: IGalleryOption[];
  onSelect: (method: string) => void;
  testID: string;
  heading: string;
}

export interface IUploadFileScreen {
  goToNextScreen: () => void;
  totalSteps: number;
  currentScreenIndex: number;
  onGoBack: () => void;
  resetFlow: () => void;
}
