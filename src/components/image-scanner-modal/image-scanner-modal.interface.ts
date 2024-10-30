import { type AxiosError } from 'axios';

export interface IImageScannerModal {
  visible: boolean;
  onClose: () => void;
  onRetry: () => void;
  filePath: string | null | undefined;
  error: AxiosError | null | undefined;
  isPending: boolean;
  isVideo: boolean;
}
