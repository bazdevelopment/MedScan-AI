type ActionButton = {
  label: string;
  onPress: () => void;
  variant?: 'default' | 'secondary';
  icon?: React.ReactElement;
};

export interface IEdgeCaseTemplate {
  image: React.ReactElement;
  title?: string;
  message?: string;
  primaryAction?: ActionButton;
  secondaryAction?: ActionButton;
  additionalClassName?: string;
}
