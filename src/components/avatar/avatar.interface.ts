export interface IAvatar {
  size?: 'small' | 'medium' | 'large';
  shape?: 'circle' | 'rounded' | 'square';
  imageUrl: string;
  altText?: string;
  showInitials?: boolean;
  initials?: string;
  textColor?: string;
  className?: string;
  textClassName?: string;
  style?: object;
  withBorder?: boolean;
}
