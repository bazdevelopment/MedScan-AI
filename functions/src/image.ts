/* eslint-disable max-lines-per-function */
import Anthropic from '@anthropic-ai/sdk';
import * as functions from 'firebase-functions/v1';

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
    const textResult = messageContent.text;

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
