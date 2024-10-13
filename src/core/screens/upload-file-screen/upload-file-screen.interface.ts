import { type ReactElement } from 'react';

export interface IGalleryOption {
  label: string;
  id: number;
  icon: ReactElement;
}

export interface IUploadFileOptions {
  options: IGalleryOption[];
  onSelect: (method: string) => void;
  testID: string;
}

export interface IUploadFileScreen {
  goToNextScreen: () => void;
}
