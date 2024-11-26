import { StyleSheet } from 'react-native';

export const storySkeletonStyles = StyleSheet.create({
  skeletonItem: {
    alignItems: 'center',
    width: 65,
  },
  skeletonCircle: {
    width: 65,
    height: 65,
    borderRadius: 40,
    backgroundColor: '#e2e8f0',
  },
  skeletonText: {
    width: 65,
    height: 12,
    backgroundColor: '#e2e8f0',
    marginTop: 8,
    borderRadius: 6,
  },
});
