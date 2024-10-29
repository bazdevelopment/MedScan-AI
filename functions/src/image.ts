/* eslint-disable max-lines-per-function */
import Anthropic from '@anthropic-ai/sdk';
import { ImageBlockParam, TextBlockParam } from '@anthropic-ai/sdk/resources';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import * as functions from 'firebase-functions/v1';
import { Request } from 'firebase-functions/v1/https';
import ffmpeg from 'fluent-ffmpeg';

import { getBase64ImageFrames } from '../utilities/extract-video-frames';
import { processUploadedFile } from '../utilities/multipart';
ffmpeg.setFfmpegPath(ffmpegPath.path);

export const analyzeImage = async (data: {
  userId: string;
  base64Image: string;
  mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
}) => {
  const { base64Image, userId } = data;

  if (!base64Image) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'No image provided',
    );
  }

  if (!userId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'No userId provided',
    );
  }
  // Initialize Anthropic client
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: data.mediaType,
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: process.env.IMAGE_ANALYZE_PROMPT as string,
            },
          ],
        },
      ],
    });

    const messageContent = message.content[0] as any;
    const textResult: string = messageContent.text;

    // TODO: update the number of scans that user has

    return {
      message: 'Successfully analyzed base64 image',
      interpretationResult: textResult,
    };
  } catch (error: any) {
    // Handle specific error types
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    // Handle Anthropic API errors
    if (error.status) {
      throw new functions.https.HttpsError(
        'internal',
        `Anthropic API error: ${error.message}`,
      );
    }

    throw new functions.https.HttpsError(
      'internal',
      'Failed to analyze X-Ray image',
    );
  }
};

export const analyzeVideo = async (req: Request, res: any) => {
  try {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Methods', 'GET');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
    }

    const { files } = await processUploadedFile(req);
    // Assuming we process the first video file
    const videoFile = files[0];

    if (!videoFile) {
      return res.status(400).send({ error: 'No video file uploaded.' });
    }

    const base64Frames = await getBase64ImageFrames(
      videoFile.filename,
      videoFile.buf,
    );

    const content: (TextBlockParam | ImageBlockParam)[] = [
      ...base64Frames.flatMap((base64String, index) => [
        {
          type: 'text',
          text: `Image ${index + 1}:`,
        } as TextBlockParam, // Explicitly assert type here
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/jpeg',
            data: base64String,
          },
        } as ImageBlockParam, // Explicitly assert type here
      ]),
      {
        type: 'text',
        text: 'How are these images different?',
      } as TextBlockParam, // Explicitly assert type here
    ];

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      // system:"Respond in english",
      messages: [
        {
          role: 'user',
          content: content,
        },
      ],
    });

    const messageContent = message.content[0] as any;
    const textResult = messageContent.text;
    // TODO: update the number of scans that user has

    return res.status(200).json({
      message: 'Successfully analyzed base64 image frames',
      interpretationResult: textResult,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
