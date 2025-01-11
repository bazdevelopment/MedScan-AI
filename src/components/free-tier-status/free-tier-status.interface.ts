export interface IFreeTierStatus {
  scansLeft: number;
  onUpgrade: () => void;
  className?: string;
}
