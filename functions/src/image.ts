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
import { checkDailyScanLimit } from '../utilities/check-daily-scan-limit';
import {
  convertBufferToBase64,
  getBase64ImageFrames,
} from '../utilities/extract-video-frames';
import { generateUniqueId } from '../utilities/generate-unique-id';
import {
  handleOnRequestError,
  logError,
} from '../utilities/handle-on-request-error';
import { LANGUAGES } from '../utilities/languages';
import { processUploadedFile } from '../utilities/multipart';
import { admin } from './common';
import { getTranslation } from './translations';
ffmpeg.setFfmpegPath(ffmpegPath.path);

const db = admin.firestore();

export const analyzeImage = async (req: Request, res: any) => {
  try {
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
    const { files, fields } = await processUploadedFile(req);
    const languageAbbreviation = req.headers['accept-language'];

    const additionalLngPrompt = `Please respond only in ${LANGUAGES[languageAbbreviation as keyof typeof LANGUAGES]} from now on.`;

    const t = getTranslation(languageAbbreviation as string);
    const { userId, promptMessage, highlightedRegions } = fields;
    const [imageFile] = files;
    const userPromptInput = promptMessage.length
      ? `The user has these questions or is looking to find out this:${promptMessage}`
      : '';
    const userDoc = db.collection('users').doc(userId);
    const userInfoSnapshot = await userDoc.get();
    const storage = admin.storage();

    if (!userInfoSnapshot.exists) {
      throw new functions.https.HttpsError('not-found', t.common.noUserFound);
    }

    const { lastScanDate, scansToday } = userInfoSnapshot.data() as {
      lastScanDate: string;
      scansToday: number;
    };

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

    // First check daily limits (new logic)
    const canScanResult = await checkDailyScanLimit({
      userId,
      lastScanDate,
      scansToday,
      dailyLimit: 20,
    });
    if (!canScanResult.canScan) {
      const limitReachedMessage = 'Scan Limit Reached';
      logError('Analyze Image Conversation Error', {
        message: limitReachedMessage,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
      return res.status(500).json({
        success: false,
        message: limitReachedMessage,
      });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const base64String = convertBufferToBase64(imageFile.buf);

    const conversationPrompt = `${additionalLngPrompt}. ${process.env.IMAGE_ANALYZE_PROMPT}. ${Number(highlightedRegions) > 0 ? `This medical image has ${Number(highlightedRegions)} regions marked in red. Examine part of each highlighted region of the picture and provide a thorough medical analysis (Key observations,potential abnormalities,clinical relevance)` : ''}. ${userPromptInput}.`;

    const message = await anthropic.messages.create({
      model: AI_MODELS.CLAUDE_37_SONNET,
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

      await analysisDocRef.set({
        userId,
        url,
        filePath,
        interpretationResult: textResult,
        createdAt,
        id: uniqueId,
        mimeType: imageFile.mimeType,
        promptMessage,
        conversationId: conversationDocRef.id,
      });

      // Increment the scans
      const today = new Date().toISOString().split('T')[0];

      await userDoc.update({
        completedScans: admin.firestore.FieldValue.increment(1),
        scansToday: admin.firestore.FieldValue.increment(1),
        scansRemaining: admin.firestore.FieldValue.increment(-1),
        lastScanDate: today,
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

// the new endpoint for analyzeImageConversation
export const analyzeImageConversationV2 = async (
  data: {
    promptMessage: string;
    image: string;
    language: string;
    storagePath: string;
  },
  context: any,
) => {
  let t;
  try {
    t = getTranslation(data.language);

    // const { files, fields } = await processUploadedFile(req);
    const languageAbbreviation = data.language;
    // Validate authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound,
      );
    }
    const userId = context.auth?.uid;
    const additionalLngPrompt = `The response language must be in ${LANGUAGES[languageAbbreviation as keyof typeof LANGUAGES]} but do not mention this in the response.`;
    // const t = getTranslation(languageAbbreviation as string);
    // const { userId, promptMessage } = fields;
    // const [imageFile] = files;
    const userPromptInput = data.promptMessage.length
      ? `This is some additional information from the user regarding his request or expectations for this analysis:${data.promptMessage}`
      : '';
    const userDoc = db.collection('users').doc(userId);
    const userInfoSnapshot = await userDoc.get();
    // const storage = admin.storage();

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

    // if (!userId) {
    //   handleOnRequestError({
    //     error: { message: t.common.userIdMissing },
    //     res,
    //     context: 'Analyze image',
    //   });
    // }
    // if (!imageFile.buf) {
    //   handleOnRequestError({
    //     error: { message: t.analyzeImage.imageMissing },
    //     res,
    //     context: 'Analyze image',
    //   });
    // }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // const base64String = convertBufferToBase64(imageFile.buf);

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
                type: 'url' as any,
                url: data.image,
              } as any,
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

    // // Generate a unique filename
    // const uniqueId = generateUniqueId();
    // const filePath = `interpretations/${userId}/${uniqueId}`;

    // Save the analysis result and metadata in Firestore
    try {
      // Create a new conversation document
      const createdAt = admin.firestore.FieldValue.serverTimestamp();

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
                  url: data.image,
                },
              },
              // // Add prompt message (optional)
            ],
          },
          ...(data.promptMessage
            ? [{ role: 'user', content: data.promptMessage }]
            : []),
          {
            role: 'assistant',
            content: textResult, // Assistant's response
          },
        ],
        createdAt,
        updatedAt: createdAt,
        imageUrl: data.image, // Store the image URL separately
        promptMessage: data.promptMessage, // Store the prompt message separately (if it exists)
      });

      const analysisDocRef = admin
        .firestore()
        .collection('interpretations')
        .doc();

      // NEW: Add the base64 image data to a separate collection for conversation context

      await analysisDocRef.set({
        userId,
        url: data.image,
        fileStoragePath: data.storagePath,
        interpretationResult: textResult,
        createdAt,
        mimeType: 'image/jpeg',
        promptMessage: data.promptMessage,
        conversationId: conversationDocRef.id,
      });

      // Update user stats
      await userDoc.update({
        completedScans: admin.firestore.FieldValue.increment(1),
        scansRemaining: admin.firestore.FieldValue.increment(-1),
      });

      return {
        success: true,
        message: t.analyzeImage.analysisCompleted,
        interpretationResult: textResult,
        promptMessage: data.promptMessage,
        createdAt: dayjs().toISOString(),
        conversationId: conversationDocRef.id, // Return the conversation ID for future messages
      };
    } catch (error) {
      console.error('Error saving analysis metadata to Firestore:', error);
      return {
        success: false,
        message: t.analyzeImage.interpretationNotSaved,
      };
    }
  } catch (error: any) {
    t = t || getTranslation('en');
    throw new functions.https.HttpsError(
      error.code || 'internal',
      error.message || 'error',
      { message: error.message },
    );
  }
};

export const continueConversation = async (req: Request, res: any) => {
  let t;
  try {
    const {
      userId,
      conversationId,
      userMessage,
      conversationMode = 'IMAGE_SCAN_CONVERSATION',
    } = req.body;
    const languageAbbreviation = req.headers['accept-language'];
    t = getTranslation(languageAbbreviation as string);

    const additionalLngPrompt = `The response language must be in ${LANGUAGES[languageAbbreviation as keyof typeof LANGUAGES]} but do not mention this in the response.`;

    const responseGuidelinesImageScan =
      "Response Guidelines: 1. Valid Medical Imaging Follow-Ups: * Take into account all the details from the first response (e.g., modality, anatomy, abnormalities) when continuing the conversation. (e.g., modality, anatomy, abnormalities) as a reference point. * Expand on specific aspects (e.g., tissue traits, imaging theory) as requested, keeping it theoretical (e.g., ‘in theory, this could reflect…’). * Avoid repeating the full initial report unless asked; focus on the user’s specific query.  2. For questions about user health (e.g., questions referring to your, yourself, etc.): Respond: 'I won’t assist with personal health issues. Consult a healthcare specialist.’ Role: * Act as a radiology expert, not a health advisor. * DO NOT provide any form of diagnosis, DO NOT suggest specific treatments, or make health assessments or measurements.";
    const responseGuidelinesRandomChat =
      'Imagine you are Aria, a chatbot with in-depth expertise in the medical field. If you haven’t already, introduce yourself and maintain an engaging, friendly conversation with the user. Keep it interactive and enjoyable';
    const responseGuidelines =
      conversationMode === 'IMAGE_SCAN_CONVERSATION'
        ? responseGuidelinesImageScan
        : responseGuidelinesRandomChat;
    if (!userId || !userMessage) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields (userId,  userMessage).',
      });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    let conversationDocRef;
    let messages = [];

    // Check if a conversationId is provided
    if (conversationId) {
      // Reference to the conversation document
      conversationDocRef = admin
        .firestore()
        .collection('conversations')
        .doc(conversationId);

      // Attempt to fetch the conversation document
      const conversationSnapshot = await conversationDocRef.get();

      if (!conversationSnapshot.exists) {
        // If the document doesn't exist, create a new one with an empty messages array
        await conversationDocRef.set({
          messages: [], // Start with an empty array of messages for the new conversation
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Now, since the document is created, you can set messages if needed
        messages = []; // (or any default message you want to add initially)
      } else {
        // If the document exists, retrieve the messages from it
        messages = conversationSnapshot.data()?.messages || [];
      }
    } else {
      // Handle case where conversationId is not provided
      // Optionally, throw an error or handle this scenario
      throw new Error('Conversation ID is required');
    }
    // Check message limit
    if (messages.length > 20) {
      // maybe you can increase the limit for messages without image/video
      return res.status(400).json({
        success: false,
        message: t.continueConversation.messagesLimit,
      });
    }
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
            content: `The user added this as input: ${userMessage}.${additionalLngPrompt}.Follow this guidelines for giving the response back:${responseGuidelines}`,
          },
        ],
      });
    } catch (error: any) {
      console.error('Error calling Anthropic API:', error, error.message);
      return res.status(500).json({
        success: false,
        message: t.continueConversation.serviceIssueAi,
      });
    }

    if (!response || !response.content || response.content.length === 0) {
      return res.status(500).json({
        success: false,
        message: t.continueConversation.noResponseAiService,
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
  } catch (error: any) {
    console.error('Error continuing conversation:', error);
    res.status(500).json({
      success: false,
      message: `An error occurred while continuing the conversation: ${error.message}`,
    });
  }
};

export const analyzeVideoConversation = async (req: Request, res: any) => {
  try {
    const { files, fields } = await processUploadedFile(req);
    const { userId, promptMessage } = fields;
    const languageAbbreviation = req.headers['accept-language'];
    const preferredLanguage =
      LANGUAGES[languageAbbreviation as keyof typeof LANGUAGES];
    const additionalLngPrompt = `The response language must be in ${preferredLanguage}`;
    const userPromptInput = promptMessage.length
      ? `The user has these questions or is looking to find out this:${promptMessage}`
      : '';
    const t = getTranslation(languageAbbreviation as string);
    const [videoFile] = files;

    const userDoc = db.collection('users').doc(userId);
    const userInfoSnapshot = await userDoc.get();
    const storage = admin.storage();

    if (!userInfoSnapshot.exists) {
      throw new functions.https.HttpsError('not-found', t.common.noUserFound);
    }

    if (!userId) {
      handleOnRequestError({
        error: { message: t.common.userIdMissing },
        res,
        context: 'Analyze video',
      });
    }
    const { lastScanDate, scansToday } = userInfoSnapshot.data() as {
      lastScanDate: string;
      scansToday: number;
    };

    const canScanResult = await checkDailyScanLimit({
      userId,
      lastScanDate,
      scansToday,
      dailyLimit: 15, // 15 for videos
    });
    if (!canScanResult.canScan) {
      const limitReachedMessage = 'Scan Limit Reached';
      logError('Analyze Video Conversation Error - Scan Limit Reached', {
        message: limitReachedMessage,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
      return res.status(500).json({
        success: false,
        message: limitReachedMessage,
      });
    }

    // Extract frames from the video
    const base64Frames = await getBase64ImageFrames(
      videoFile.filename,
      videoFile.buf,
    );
    // Upload frames to Firebase Storage and get their public URLs
    const frameUrls = await uploadFramesToStorage(base64Frames, userId);

    // Prepare content for AI analysis
    const content = [
      ...frameUrls.map((url) => ({
        type: 'image',
        source: {
          type: 'url',
          url,
        },
      })),
      {
        type: 'text',
        text: `${additionalLngPrompt}.${process.env.IMAGE_ANALYZE_PROMPT}.${userPromptInput}.`,
      },
    ];

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Send frames and prompt to AI for analysis
    const message = await anthropic.messages.create({
      model: AI_MODELS.CLAUDE_35_HAIKU,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: content as any,
        },
      ],
    });

    const messageContent = message.content[0] as any;
    const textResult = messageContent?.text || '';

    // Upload the video to Firebase Storage
    const uniqueId = generateUniqueId();
    const videoFilePath = `interpretations/${userId}/${uniqueId}`;
    const bucket = storage.bucket();
    const videoFileRef = bucket.file(videoFilePath);

    try {
      await videoFileRef.save(videoFile.buf, {
        metadata: {
          contentType: videoFile.mimeType,
          metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
          },
        },
      });

      await videoFileRef.makePublic();
    } catch (error) {
      console.error('Error uploading video to Firebase Storage:', error);
      return res.status(500).json({
        success: false,
        message: t.analyzeVideo.uploadVideoStorageError,
      });
    }

    const videoUrl = videoFileRef.publicUrl();
    // Save the analysis result and metadata in Firestore
    try {
      const analysisDocRef = admin
        .firestore()
        .collection('interpretations')
        .doc();
      const createdAt = admin.firestore.FieldValue.serverTimestamp();

      await analysisDocRef.set({
        userId,
        url: videoUrl,
        filePath: videoFilePath,
        interpretationResult: textResult,
        createdAt,
        id: uniqueId,
        mimeType: videoFile.mimeType,
        promptMessage,
        title: '',
        frameUrls, // Store the public URLs of the extracted frames
      });
      // Increment the scans
      const today = new Date().toISOString().split('T')[0];
      // Update user stats
      await userDoc.update({
        completedScans: admin.firestore.FieldValue.increment(1),
        scansRemaining: admin.firestore.FieldValue.increment(-1),
        lastScanDate: today,
        scansToday: admin.firestore.FieldValue.increment(1),
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
              ...content,
              ...(promptMessage ? [{ type: 'text', text: promptMessage }] : []),
            ],
          },
          {
            role: 'assistant',
            content: textResult,
          },
        ],
        createdAt,
        updatedAt: createdAt,
        url: videoUrl,
        promptMessage,
        frameUrls, // Store the frame URLs in the conversation document
      });

      res.status(200).json({
        success: true,
        message: t.analyzeVideo.analysisCompleted,
        interpretationResult: textResult,
        promptMessage,
        createdAt: dayjs().toISOString(),
        conversationId: conversationDocRef.id,
      });
    } catch (error) {
      console.error('Error saving analysis metadata to Firestore:', error);
      return res.status(500).json({
        success: false,
        message: t.analyzeVideo.interpretationNotSaved,
      });
    }
  } catch (error: any) {
    handleOnRequestError({
      error,
      res,
      context: 'Analyze video',
    });
  }
};

/**
 * Uploads frames to Firebase Storage and returns their public URLs.
 * @param {string[]} base64Frames - The base64 encoded frames to upload.
 * @param {string} userId - The ID of the user.
 */
async function uploadFramesToStorage(
  base64Frames: string[],
  userId: string,
): Promise<string[]> {
  const storage = admin.storage();
  const bucket = storage.bucket();
  const frameUrls: string[] = [];
  for (let i = 0; i < base64Frames.length; i++) {
    const base64String = base64Frames[i];
    const uniqueId = generateUniqueId();
    const filePath = `interpretations/${userId}/frames/${uniqueId}.jpg`;
    const file = bucket.file(filePath);
    const buffer = Buffer.from(base64String, 'base64');

    try {
      await file.save(buffer, {
        metadata: {
          contentType: 'image/jpeg',
          metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
          },
        },
      });

      await file.makePublic();
      const url = file.publicUrl();
      frameUrls.push(url);
    } catch (error) {
      console.error('Error uploading frame to Firebase Storage:', error);
      throw error;
    }
  }

  return frameUrls;
}

export const analyzeVideoConversationV2 = async (
  data: {
    promptMessage: string;
    imageUrls: string[];
    language: string;
    storagePaths: string[];
  },
  context: any,
) => {
  let t;
  try {
    t = getTranslation(data.language);

    const languageAbbreviation = data.language;
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        t.common.noUserFound,
      );
    }
    const userId = context.auth?.uid;

    const preferredLanguage =
      LANGUAGES[languageAbbreviation as keyof typeof LANGUAGES];
    const additionalLngPrompt = `The response language must be in ${preferredLanguage}`;
    const userPromptInput = data.promptMessage.length
      ? `This is some additional information from the user regarding his request or expectations for this analysis:${data.promptMessage}`
      : '';

    const userDoc = db.collection('users').doc(userId);
    const userInfoSnapshot = await userDoc.get();

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

    // if (!userId) {
    //   handleOnRequestError({
    //     error: { message: t.common.userIdMissing },
    //     res,
    //     context: 'Analyze video',
    //   });
    // }
    // if (!videoFile.buf) {
    //   handleOnRequestError({
    //     error: { message: t.analyzeVideo.videoMissing },
    //     res,
    //     context: 'Analyze video',
    //   });
    // }

    // Prepare content for AI analysis
    const content = [
      ...data.imageUrls.map((url) => ({
        type: 'image',
        source: {
          type: 'url',
          url,
        },
      })),
      {
        type: 'text',
        text: `${process.env.IMAGE_ANALYZE_PROMPT}.${userPromptInput}.${additionalLngPrompt}`,
      },
    ];

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Send frames and prompt to AI for analysis
    const message = await anthropic.messages.create({
      model: AI_MODELS.CLAUDE_35_HAIKU,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: content as any,
        },
      ],
    });

    const messageContent = message.content[0] as any;
    const textResult = messageContent.text;

    // Save the analysis result and metadata in Firestore
    try {
      const analysisDocRef = admin
        .firestore()
        .collection('interpretations')
        .doc();
      const createdAt = admin.firestore.FieldValue.serverTimestamp();

      await analysisDocRef.set({
        userId,
        fileStoragePath: data.storagePaths,
        interpretationResult: textResult,
        createdAt,
        mimeType: 'image/jpeg',
        promptMessage: data.promptMessage,
        title: '',
        imageUrls: data.imageUrls, // Store the public URLs of the extracted frames
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
              ...content,
              ...(data.promptMessage
                ? [{ type: 'text', text: data.promptMessage }]
                : []),
            ],
          },
          {
            role: 'assistant',
            content: textResult,
          },
        ],
        createdAt,
        updatedAt: createdAt,
        promptMessage: data.promptMessage,
        frameUrls: data.imageUrls, // Store the frame URLs in the conversation document
      });

      return {
        success: true,
        message: t.analyzeVideo.analysisCompleted,
        interpretationResult: textResult,
        promptMessage: data.promptMessage,
        createdAt: dayjs().toISOString(),
        conversationId: conversationDocRef.id,
      };
    } catch (error) {
      console.error('Error saving analysis metadata to Firestore:', error);
      return {
        success: false,
        message: t.analyzeVideo.interpretationNotSaved,
      };
    }
  } catch (error: any) {
    t = t || getTranslation('en');
    throw new functions.https.HttpsError(
      error.code || 'internal',
      error.message || 'error',
      { message: error.message },
    );
  }
};
