import { type ISquare } from '../annotation-square/annotation-square.interface';

export interface IImageAnnotationStudio {
  imageUri: string;
  closeTool: () => void;
  onUpdateImageUrlHighlighted: (uri: string) => void;
  removeSquare: (id: number) => void;
  addSquare: () => void;
  squares: ISquare[];
}
