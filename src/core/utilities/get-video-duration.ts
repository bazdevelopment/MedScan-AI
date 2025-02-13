import { Audio } from 'expo-av';

export const getVideoDuration = async (uri: string): Promise<number | null> => {
  try {
    const { status } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false },
    );

    if (status.isLoaded) {
      return status.durationMillis || 0; // Return duration in milliseconds
    }
  } catch (error) {
    console.error('Error getting video duration:', error);
  }

  return null;
};
