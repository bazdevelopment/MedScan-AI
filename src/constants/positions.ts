export const POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type TPositions = (typeof POSITIONS)[keyof typeof POSITIONS];
