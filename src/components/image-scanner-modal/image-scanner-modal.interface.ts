export interface IImageScannerModal {
  visible: boolean;
  onClose: () => void;
  imagePath: string;
  goToNextScreen: () => void;
}
