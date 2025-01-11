export interface ICustomHeader {
  title: string;
  onGoBack?: () => void;
  rightContent?: React.ReactNode;
  className?: string;
  titlePosition?: 'left' | 'center' | 'right';
}
