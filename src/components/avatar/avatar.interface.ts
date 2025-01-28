export interface IAvatar {
  size?: 'small' | 'medium' | 'large' | 'xl';
  shape?: 'circle' | 'rounded' | 'square' | 'rounded-xl';
  image: string;
  altText?: string;
  showInitials?: boolean;
  initials?: string;
  textColor?: string;
  className?: string;
  textClassName?: string;
  style?: object;
  withBorder?: boolean;
  isEditable: boolean;
}
