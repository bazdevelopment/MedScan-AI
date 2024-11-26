import { type StoryItemProps } from '@birdwingo/react-native-instagram-stories/src/core/dto/instagramStoriesDTO';

export interface ScanExample {
  name: string;
  image: string;
  explanation: string;
}

export interface ScanType {
  id: number;
  name: string;
  fullName: string;
  examples: ScanExample[];
}

export interface StoryUser {
  id: string;
  name: string;
  imgUrl: string;
  avatarSource: { uri: string };
  stories: StoryItemProps[];
}
