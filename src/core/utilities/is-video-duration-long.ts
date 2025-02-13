import { VIDEO_LENGTH_SECONDS_LIMIT } from '@/constants/limits';

/**Check if the video exceeds the seconds limit allowed */
export const isVideoDurationLong = (duration: number): boolean => {
  const durationInSeconds = convertVideoDurationInSeconds(duration as number);
  return durationInSeconds > VIDEO_LENGTH_SECONDS_LIMIT;
};

/**Convert video duration fro miliseconds in seconds */
export const convertVideoDurationInSeconds = (durationMiliseconds: number) =>
  durationMiliseconds ? Math.floor(durationMiliseconds / 1000) : 0;
