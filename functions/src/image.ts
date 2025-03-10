/* eslint-disable max-lines-per-function */
import Anthropic from '@anthropic-ai/sdk';
import { ImageBlockParam, TextBlockParam } from '@anthropic-ai/sdk/resources';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import * as functions from 'firebase-functions/v1';
import { Request } from 'firebase-functions/v1/https';
import ffmpeg from 'fluent-ffmpeg';
import { v4 as uuidv4 } from 'uuid';

import dayjs from '../dayjs';
import { AI_MODELS } from '../utilities/ai-models';
import {
  convertBufferToBase64,
  getBase64ImageFrames,
} from '../utilities/extract-video-frames';
import { generateUniqueId } from '../utilities/generate-unique-id';
import { handleOnRequestError } from '../utilities/handle-on-request-error';
import { LANGUAGES } from '../utilities/languages';
import { processUploadedFile } from '../utilities/multipart';
import { admin } from './common';
import { getTranslation } from './translations';
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
    const languageAbbreviation = req.headers['accept-language'];

    const additionalLngPrompt = `The response language must be in ${LANGUAGES[languageAbbreviation as keyof typeof LANGUAGES]}`;
    const t = getTranslation(languageAbbreviation as string);
    const { userId, promptMessage } = fields;
    const [imageFile] = files;
    const userPromptInput = promptMessage.length
      ? `This is some additional information from the user regarding his request or expectations for this analysis:${promptMessage}`
      : '';
    const userDoc = db.collection('users').doc(userId);
    const userInfoSnapshot = await userDoc.get();
    const storage = admin.storage();

    if (!userInfoSnapshot.exists) {
      throw new functions.https.HttpsError('not-found', t.common.noUserFound);
    }

    const { scansRemaining } = userInfoSnapshot.data() as {
      scansRemaining: number;
    };

    if (scansRemaining <= 0) {
      throw new functions.https.HttpsError(
        'resource-exhausted',
        t.analyzeImage.scanLimitReached,
      );
    }

    if (!userId) {
      handleOnRequestError({
        error: { message: t.common.userIdMissing },
        res,
        context: 'Analyze image',
      });
    }
    if (!imageFile.buf) {
      handleOnRequestError({
        error: { message: t.analyzeImage.imageMissing },
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
      model: AI_MODELS.CLAUDE_35_HAIKU,
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
              text: `${process.env.IMAGE_ANALYZE_PROMPT}.${userPromptInput}.${additionalLngPrompt}`,
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
        public: true,
      });
    } catch (error) {
      console.error('Error uploading file to Firebase Storage:', error);
      return res.status(500).json({
        success: false,
        message: t.analyzeImage.uploadImageStorageError,
      });
    }
    const url = file.publicUrl();
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

      await userDoc.update({
        completedScans: admin.firestore.FieldValue.increment(1),
      });
    } catch (error) {
      console.error('Error saving analysis metadata to Firestore:', error);
      return res.status(500).json({
        success: false,
        message: t.analyzeImage.interpretationNotSaved,
      });
    }

    res.status(200).json({
      success: true,
      message: t.analyzeImage.analysisCompleted,
      interpretationResult: textResult,
      promptMessage,
      createdAt: dayjs().toISOString(),
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

    const userDoc = db.collection('users').doc(userId);

    const languageAbbreviation = req.headers['accept-language'];
    const preferredLanguage =
      LANGUAGES[languageAbbreviation as keyof typeof LANGUAGES];
    const additionalLngPrompt = `The response language must be in ${preferredLanguage}`;
    const userPromptInput = promptMessage.length
      ? `This is some additional information from the user regarding his request or expectations for this analysis:${promptMessage}`
      : '';
    const t = getTranslation(languageAbbreviation as string);
    // Assuming we process the first video file
    const videoFile = files[0];

    if (!videoFile) {
      return res.status(400).send({ error: t.analyzeVideo.noVideoFound });
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
        text: `${process.env.IMAGE_ANALYZE_PROMPT}.${userPromptInput}.${additionalLngPrompt}`,
      } as TextBlockParam,
    ];

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: AI_MODELS.CLAUDE_35_HAIKU,
      max_tokens: 1024,
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
        public: true,
      });
    } catch (error) {
      console.error('Error uploading video to Firebase Storage:', error);
      return res.status(500).json({
        success: false,
        message: t.analyzeVideo.uploadVideoStorageError,
      });
    }

    const url = file.publicUrl();

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

      await userDoc.update({
        completedScans: admin.firestore.FieldValue.increment(1),
      });
    } catch (error) {
      console.error('Error saving analysis metadata to Firestore:', error);
      return res.status(500).json({
        success: false,
        message: t.analyzeVideo.interpretationNotSaved,
      });
    }
    return res.status(200).json({
      success: true,
      message: t.analyzeVideo.analysisCompleted,
      interpretationResult: textResult,
      promptMessage,
      createdAt: dayjs().toISOString(),
    });
  } catch (error) {
    handleOnRequestError({
      error,
      res,
      context: 'Analyze video',
    });
  }
};
// !NEW FEATURE TO CONTINUE CONVERSATION
export const analyzeImageConversation = async (req: Request, res: any) => {
  try {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Methods', 'GET');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
    }

    const { files, fields } = await processUploadedFile(req);
    const languageAbbreviation = req.headers['accept-language'];

    const additionalLngPrompt = `The response language must be in ${LANGUAGES[languageAbbreviation as keyof typeof LANGUAGES]} but do not mention this in the response.`;
    const t = getTranslation(languageAbbreviation as string);
    const { userId, promptMessage } = fields;
    const [imageFile] = files;
    const userPromptInput = promptMessage.length
      ? `This is some additional information from the user regarding his request or expectations for this analysis:${promptMessage}`
      : '';
    const userDoc = db.collection('users').doc(userId);
    const userInfoSnapshot = await userDoc.get();
    const storage = admin.storage();

    if (!userInfoSnapshot.exists) {
      throw new functions.https.HttpsError('not-found', t.common.noUserFound);
    }

    const { scansRemaining } = userInfoSnapshot.data() as {
      scansRemaining: number;
    };

    if (scansRemaining <= 0) {
      throw new functions.https.HttpsError(
        'resource-exhausted',
        t.analyzeImage.scanLimitReached,
      );
    }

    if (!userId) {
      handleOnRequestError({
        error: { message: t.common.userIdMissing },
        res,
        context: 'Analyze image',
      });
    }
    if (!imageFile.buf) {
      handleOnRequestError({
        error: { message: t.analyzeImage.imageMissing },
        res,
        context: 'Analyze image',
      });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const base64String = convertBufferToBase64(imageFile.buf);

    // Modification: Add conversation context to the prompt
    const conversationPrompt = `${process.env.IMAGE_ANALYZE_PROMPT}. Please provide a detailed analysis that includes all visual aspects of this image, as the user may ask follow-up questions about specific details later. ${userPromptInput}. ${additionalLngPrompt}`;

    const message = await anthropic.messages.create({
      model: AI_MODELS.CLAUDE_35_HAIKU,
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
              text: conversationPrompt,
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
    const token = uuidv4();
    try {
      await file.save(imageFile.buf, {
        metadata: {
          contentType: imageFile.mimeType,
          metadata: {
            firebaseStorageDownloadTokens: token, // ! Add token for preview in the dashboard this add an access token to the image otherwise it wont be visible in the dashboard
          },
        },
      });

      // Make the file publicly readable
      await file.makePublic();

      // Download URL (for Firebase Storage dashboard)
      // const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${token}`;
      // Generate a signed URL or stream the file

      // ! for the future you can generate a signed url for a specific time (for eg. if you want the image url to be valid for 1 hour)
      // const [url] = await file.getSignedUrl({
      //   action: 'read',
      //   expires: Date.now() + 3600 * 1000, // 1 hour from now
      // });
    } catch (error) {
      console.error('Error uploading file to Firebase Storage:', error);
      return res.status(500).json({
        success: false,
        message: t.analyzeImage.uploadImageStorageError,
      });
    }
    const url = file.publicUrl();

    // Save the analysis result and metadata in Firestore
    try {
      const analysisDocRef = admin
        .firestore()
        .collection('interpretations')
        .doc();
      const createdAt = admin.firestore.FieldValue.serverTimestamp();

      // NEW: Add the base64 image data to a separate collection for conversation context

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

      // Update user stats
      await userDoc.update({
        completedScans: admin.firestore.FieldValue.increment(1),
        scansRemaining: admin.firestore.FieldValue.increment(-1),
      });

      // Create a new conversation document
      const conversationDocRef = admin
        .firestore()
        .collection('conversations')
        .doc();

      await conversationDocRef.set({
        userId,
        messages: [
          {
            role: 'user',
            content: [
              // Add image URL (mandatory)
              {
                type: 'image',
                source: {
                  type: 'url',
                  url, // Always include the image URL
                },
              },
              // // Add prompt message (optional)
              // ...(promptMessage
              //   ? [
              //       {
              //         type: 'text',
              //         text: promptMessage, // Include the text prompt if it exists
              //       },
              //     ]
              //   : []),
            ],
          },
          ...(promptMessage ? [{ role: 'user', content: promptMessage }] : []),
          {
            role: 'assistant',
            content: textResult, // Assistant's response
          },
        ],
        createdAt,
        updatedAt: createdAt,
        imageUrl: url, // Store the image URL separately
        promptMessage, // Store the prompt message separately (if it exists)
      });

      res.status(200).json({
        success: true,
        message: t.analyzeImage.analysisCompleted,
        interpretationResult: textResult,
        promptMessage,
        createdAt: dayjs().toISOString(),
        conversationId: conversationDocRef.id, // Return the conversation ID for future messages
      });
    } catch (error) {
      console.error('Error saving analysis metadata to Firestore:', error);
      return res.status(500).json({
        success: false,
        message: t.analyzeImage.interpretationNotSaved,
      });
    }
  } catch (error: any) {
    handleOnRequestError({
      error,
      res,
      context: 'Analyze image',
    });
  }
};

export const continueConversation = async (req: Request, res: any) => {
  try {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Methods', 'POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
    }

    const { userId, conversationId, userMessage } = req.body;
    const languageAbbreviation = req.headers['accept-language'];

    const additionalLngPrompt = `The response language must be in ${LANGUAGES[languageAbbreviation as keyof typeof LANGUAGES]} but do not mention this in the response.`;

    if (!userId || !conversationId || !userMessage) {
      return res.status(400).json({
        success: false,
        message:
          'Missing required fields (userId, conversationId, userMessage).',
      });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const conversationDocRef = admin
      .firestore()
      .collection('conversations')
      .doc(conversationId);
    const conversationSnapshot = await conversationDocRef.get();

    if (!conversationSnapshot.exists) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found.',
      });
    }

    const conversationData = conversationSnapshot.data();
    const messages = conversationData?.messages || [];

    let response;

    try {
      response = await anthropic.messages.create({
        model: AI_MODELS.CLAUDE_35_HAIKU,
        max_tokens: 1024,
        messages: [
          ...messages.map((msg: any) => ({
            role: msg.role,
            content: msg.content,
          })),
          {
            role: 'user',
            content: `${userMessage}.${additionalLngPrompt}`,
          },
        ],
      });
    } catch (error: any) {
      console.error('Error calling Anthropic API:', error, error.message);
      return res.status(500).json({
        success: false,
        message: `Failed to get a response from the AI service: ${error.message}`,
      });
    }

    if (!response || !response.content || response.content.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'Failed to get a valid response from the AI service.',
      });
    }

    const assistantResponse = response.content[0] as any;
    const assistantMessage = assistantResponse?.text || ''; // Default to empty string if text is undefined

    // Update the conversation with the new messages

    // Update the conversation with the new messages
    await conversationDocRef.update({
      messages: [
        ...messages,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: assistantMessage },
      ],
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
      assistantMessage,
    });

    res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
      assistantMessage,
    });
  } catch (error: any) {
    console.error('Error continuing conversation:', error);
    res.status(500).json({
      success: false,
      message: `An error occurred while continuing the conversation: ${error.message}`,
    });
  }
};
