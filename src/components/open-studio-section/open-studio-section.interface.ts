import { type ISquare } from '../annotation-square/annotation-square.interface';

export interface IOpenStudioSection {
  squares: ISquare[];
  onOpenStudio: () => void;
}
