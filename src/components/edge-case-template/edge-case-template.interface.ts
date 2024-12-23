type ActionButton = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactElement;
};

export interface IEdgeCaseTemplate {
  image: React.ReactElement;
  title: string;
  message?: string;
  primaryAction?: ActionButton;
  secondaryAction?: ActionButton;
  additionalClassName?: string;
}
