import { type SharedValue } from 'react-native-reanimated';

export interface IAnnotationSquare {
  square: ISquare;
  onDragEnd: () => void;
  screenWidth: number;
  screenHeight: number;
  deleteZoneActive: SharedValue<number>;
  trashPulse: number;
}

export interface ISquare {
  height: number;
  id: number;
  width: number;
  x: number;
  y: number;
}
