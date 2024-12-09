export interface IIcon {
  icon: JSX.Element; // The SVG or icon component to display
  size?: number; // Size of the icon
  color?: string; // Color of the icon
  label?: string; // Optional label for the icon
  labelStyle?: string; // Tailwind styles for the label
  containerStyle?: string; // Tailwind styles for the container
  iconContainerStyle?: string;
  disabled?: boolean;
  onPress?: () => void;
}
