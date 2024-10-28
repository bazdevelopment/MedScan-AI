export interface IImageScannerModal {
  visible: boolean;
  onClose: () => void;
  onRetry: () => void;
  imagePath: string;
  error: string;
  isPending: boolean;
}
