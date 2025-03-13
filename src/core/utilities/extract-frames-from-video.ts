import * as FileSystem from 'expo-file-system';
import { FFmpegKit } from 'ffmpeg-kit-react-native';

/**
 * Extracts frames from a video at a fixed interval and returns their URIs.
 * @param videoPath - The path to the video file.
 * @param intervalInSeconds - The interval between frames (in seconds).
 * @returns An array of URIs for the extracted frames.
 */
export const extractFramesFromVideo = async (
  videoPath: string,
  intervalInSeconds: number = 4, // Extract one frame every 4 seconds
): Promise<string[]> => {
  try {
    // Create a temporary directory for the frames
    const outputPath = `${FileSystem.cacheDirectory}frames`;
    await FileSystem.makeDirectoryAsync(outputPath, { intermediates: true });

    // FFmpeg command to extract frames at a fixed interval
    const ffmpegCommand = `-i ${videoPath} -vf fps=1/${intervalInSeconds} ${outputPath}/frame-%03d.jpg`;

    // Execute the FFmpeg command
    const session = await FFmpegKit.execute(ffmpegCommand);

    // Check if the command was successful
    const returnCode = await session.getReturnCode();
    if (!returnCode.isValueSuccess()) {
      throw new Error(`FFmpeg command failed with return code ${returnCode}`);
    }

    // Read the extracted frames from the output directory
    const frames = await FileSystem.readDirectoryAsync(outputPath);

    // Generate URIs for the frames
    const frameURIs = frames.map((frame) => `${outputPath}/${frame}`);

    return frameURIs;
  } catch (error) {
    console.error('Error extracting frames:', error);
    throw error;
  }
};
