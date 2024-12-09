/* eslint-disable max-lines-per-function */
import Anthropic from '@anthropic-ai/sdk';
import { ImageBlockParam, TextBlockParam } from '@anthropic-ai/sdk/resources';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import * as functions from 'firebase-functions/v1';
import { Request } from 'firebase-functions/v1/https';
import ffmpeg from 'fluent-ffmpeg';

import {
  convertBufferToBase64,
  getBase64ImageFrames,
} from '../utilities/extract-video-frames';
import { generateUniqueId } from '../utilities/generate-unique-id';
import { handleOnRequestError } from '../utilities/handle-on-request-error';
import { processUploadedFile } from '../utilities/multipart';
import { admin } from './common';
ffmpeg.setFfmpegPath(ffmpegPath.path);

const db = admin.firestore();

export const analyzeImage = async (req: Request, res: any) => {
  try {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Methods', 'GET');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
    }

    const { files, fields } = await processUploadedFile(req);

    const { userId, promptMessage } = fields;
    const [imageFile] = files;

    const userDoc = db.collection('users').doc(userId);
    const userInfoSnapshot = await userDoc.get();
    const storage = admin.storage();

    if (!userInfoSnapshot.exists) {
      throw new functions.https.HttpsError('not-found', 'User does not exist!');
    }

    const { scansRemaining } = userInfoSnapshot.data() as {
      scansRemaining: number;
    };

    if (scansRemaining <= 0) {
      throw new functions.https.HttpsError(
        'resource-exhausted',
        'You have reached the maximum number of scans.',
      );
    }

    if (!userId) {
      handleOnRequestError({
        error: { message: 'No user id provided' },
        res,
        context: 'Analyze image',
      });
    }
    if (!imageFile.buf) {
      handleOnRequestError({
        error: { message: 'No image provided' },
        res,
        context: 'Analyze image',
      });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const base64String = convertBufferToBase64(imageFile.buf);

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
                media_type: imageFile.mimeType,
                data: base64String,
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

    /* Logic for storing the image in db */
    // Generate a unique filename
    const uniqueId = generateUniqueId();
    const filePath = `interpretations/${userId}/${uniqueId}`;
    const bucket = storage.bucket();

    // Upload the image to Firebase Storage
    const file = bucket.file(filePath);

    try {
      await file.save(imageFile.buf, {
        metadata: {
          contentType: imageFile.mimeType,
        },
      });
    } catch (error) {
      console.error('Error uploading file to Firebase Storage:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload the image to Firebase Storage.',
      });
    }

    let url;
    try {
      [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });
    } catch (error) {
      console.error('Error generating signed URL:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to generate the image URL.',
      });
    }
    // Save the analysis result and metadata in Firestore
    try {
      const analysisDocRef = admin
        .firestore()
        .collection('interpretations')
        .doc();
      const createdAt = admin.firestore.FieldValue.serverTimestamp();

      await analysisDocRef.set({
        userId,
        url,
        filePath,
        interpretationResult: textResult,
        createdAt,
        id: uniqueId,
        mimeType: imageFile.mimeType,
        promptMessage,
        title: '',
      });
    } catch (error) {
      console.error('Error saving analysis metadata to Firestore:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to save analysis result to Firestore.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully analyzed base64 image frames',
      interpretationResult: textResult,
    });
  } catch (error: any) {
    handleOnRequestError({
      error,
      res,
      context: 'Analyze image',
    });
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
    const storage = admin.storage();

    const { files, fields } = await processUploadedFile(req);
    const { userId, promptMessage } = fields;

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
        } as TextBlockParam,
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/jpeg',
            data: base64String,
          },
        } as ImageBlockParam,
      ]),
      {
        type: 'text',
        text: 'How are these images different?',
      } as TextBlockParam,
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

    /* Logic for storing the video in db */
    // Generate a unique filename
    const uniqueId = generateUniqueId();
    const filePath = `interpretations/${userId}/${uniqueId}`;
    const bucket = storage.bucket();

    // Upload the video to Firebase Storage
    const file = bucket.file(filePath);

    try {
      await file.save(videoFile.buf, {
        metadata: {
          contentType: videoFile.mimeType,
        },
      });
    } catch (error) {
      console.error('Error uploading file to Firebase Storage:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload the image to Firebase Storage.',
      });
    }

    let url;
    try {
      [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });
    } catch (error) {
      console.error('Error generating signed URL:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to generate the image video url.',
      });
    }

    // Save the analysis result and metadata in Firestore

    try {
      const analysisDocRef = admin
        .firestore()
        .collection('interpretations')
        .doc();
      const createdAt = admin.firestore.FieldValue.serverTimestamp();

      await analysisDocRef.set({
        userId,
        url,
        filePath,
        interpretationResult: textResult,
        createdAt,
        id: uniqueId,
        mimeType: videoFile.mimeType,
        promptMessage,
        title: '',
      });
    } catch (error) {
      console.error('Error saving analysis metadata to Firestore:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to save analysis result to Firestore.',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Successfully analyzed base64 image frames(video)',
      interpretationResult: textResult,
    });
  } catch (error) {
    handleOnRequestError({
      error,
      res,
      context: 'Analyze video',
    });
  }
};
