/* eslint-disable max-lines-per-function */
import InstagramStories, {
  type InstagramStoriesPublicMethods,
} from '@birdwingo/react-native-instagram-stories';
import { type StoryItemProps } from '@birdwingo/react-native-instagram-stories/src/core/dto/instagramStoriesDTO';
import { useColorScheme } from 'nativewind';
import React, { useMemo, useRef } from 'react';
import { View } from 'react-native';

import { colors, Text } from '@/ui';

import { StoriesSkeletonLoader } from '../story-skeleton-loader';
import {
  type ScanType,
  type StoryUser,
} from './scan-category-stories.interface';
import { scanCategoryStyles } from './scan-category-stories.styles';

const ScanCategoriesStories: React.FC<{
  categories: ScanType[];
  isLoading: boolean;
}> = ({ categories, isLoading }) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const ref = useRef<InstagramStoriesPublicMethods>(null);
  const stories = useMemo(
    () =>
      categories
        ?.sort((a, b) => a.id - b.id)
        ?.map(
          (category, index): StoryUser => ({
            id: `${index}-${category.name}`,
            name: category.name,
            imgUrl: category.examples[0]?.image || '',
            avatarSource: { uri: category.examples[0]?.image || '' },
            stories: category.examples.map((example, index): StoryItemProps => {
              return {
                id: `${index}-${category.name}`,
                source: { uri: example.image },
                mediaType: 'image',
                renderContent: () => (
                  <Text className="mt-20 text-center">{example.name}</Text>
                ),
              };
            }),
          }),
        ),
    [categories, isDark],
    // isDark as dependency is needed for darkMode
  );

  if (isLoading) {
    return <StoriesSkeletonLoader />;
  }
  return (
    <View style={scanCategoryStyles.container}>
      <InstagramStories
        ref={ref}
        stories={stories}
        avatarSize={65}
        avatarListContainerStyle={{
          paddingRight: 16,
        }}
        avatarBorderColors={[
          colors.primary[300],
          colors.secondary[300],
          colors.primary[600],
        ]}
        backgroundColor={isDark ? colors.black : colors.white}
        showName
        storyAvatarSize={40}
        nameTextStyle={{
          ...scanCategoryStyles.nameText,
          color: isDark ? colors.white : colors.black,
        }}
        progressActiveColor={colors.primary[300]}
        progressColor={colors.lightGray}
        closeIconColor={isDark ? colors.white : colors.black}
        modalAnimationDuration={250}
        storyAnimationDuration={250}
        textStyle={{ color: isDark ? colors.white : colors.black }}
        avatarListContainerProps={{
          showsHorizontalScrollIndicator: false,
          estimatedItemSize: 65,
          ItemSeparatorComponent: () => <View style={{ marginRight: 8 }} />,
        }}
      />
    </View>
  );
};

export default ScanCategoriesStories;
