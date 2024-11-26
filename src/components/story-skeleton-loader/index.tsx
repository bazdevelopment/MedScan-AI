import { View } from 'react-native';

import StorySkeleton from '../story-skeleton';
import { storySkeletonLoaderStyles } from './story-skeleton-loader.styles';

export const StoriesSkeletonLoader: React.FC<{ count?: number }> = ({
  count = 6,
}) => {
  return (
    <View style={storySkeletonLoaderStyles.skeletonContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <StorySkeleton key={index} />
      ))}
    </View>
  );
};
