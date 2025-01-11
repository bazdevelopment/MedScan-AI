import React from 'react';
import { View } from 'react-native';

interface DotProps {
  size?: string; // Tailwind size classes like 'w-4' or 'h-4'
  color?: string; // Tailwind color classes like 'bg-red-500'
  additionalStyles?: string; // For adding any extra Tailwind classes
}

const Dot: React.FC<DotProps> = ({
  size = 'w-4 h-4',
  color = 'bg-black',
  additionalStyles = '',
}) => {
  return <View className={`${size} ${color} ${additionalStyles}`} />;
};

export default Dot;
