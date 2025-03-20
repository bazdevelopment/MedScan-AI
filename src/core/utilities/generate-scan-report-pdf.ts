/* eslint-disable max-lines-per-function */

import { Image, Platform } from 'react-native';

import { translate } from '../i18n';

const getAndroidReleaseImageURI = (assetName: string) =>
  `file:///android_res/drawable/${assetName}`;

interface IGenerateScanReportPdf {
  createdAt: string;
  interpretation: string;
  promptMessage: string;
  generatedAt: string;
}

export const generateScanReportPdf = ({
  createdAt,
  messages,
  // promptMessage,
  generatedAt,
}: IGenerateScanReportPdf) => {
  const logo = Platform.select({
    ios: Image.resolveAssetSource(require('assets/icon_transparent.png')).uri,
    android: getAndroidReleaseImageURI('icon_transparent.png'),
  });

  // const medicalFrame = Platform.select({
  //   ios: Image.resolveAssetSource(require('assets/medical_frame.png')).uri,
  //   android: getAndroidReleaseImageURI('medical_frame.png'),
  // });

  // Function to format chat messages
  const formatChatMessages = (messages: any[]) => {
    return messages
      .map((message) => {
        const isUser = message.role === 'user';
        const bubbleStyle = isUser
          ? 'background-color: #7982FD; color:white; border-radius: 16px; padding: 12px; margin-left: auto; max-width: 80%; border-bottom-right-radius: 0;'
          : 'background-color: #F3F4F6; color: black; border-radius: 16px; padding: 12px; margin-right: auto; max-width: 80%; border-bottom-left-radius: 0;';

        return `
          <div style="display: flex; flex-direction: column; align-items: ${isUser ? 'flex-end' : 'flex-start'}; margin-bottom: 12px;">
            <div style="${bubbleStyle}">
              <p style="margin: 0; font-size: 14px; line-height: 1.5;">${message.content}</p>
            </div>
          </div>
        `;
      })
      .join('');
  };

  return `
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Analysis Report</title>
    <style>
        body {
            font-family: Nunito-Sans, sans-serif;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            background-color: #F9FAFB;
        }
        .container {
            background: white;
            padding: 40px;
            border: 1px solid #E5E7EB;
            border-radius: 30px;
            max-width: 800px;
            width: 100%;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
        }
        .branding-text {
            display: flex;
            flex-direction: column;
            margin-top: -5px;
            margin-left: 5px;
        }
        .background-overlay {
            position: absolute;
            left: 25%;
            opacity: 0.7;
        }
        .logo {
            width: 70px;
            height: 70px;
        }
        h1 {
            font-size: 22px;
            margin: 10px 0;
        }
        .info {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
            margin-top: 25px;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #7982FD;
            margin-bottom: 10px;
        }
        .content {
            font-size: 14px;
            color: #333;
            line-height: 1.5;
        }
        .footer {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
            border-top: 1px solid #eee;
            padding-top: 10px;
            text-align: center;
        }
        .chat-container {
            margin-top: 20px;
        }
        .user-message {
            background-color: #7982FD;
            color: white;
            border-radius: 16px;
            padding: 12px;
            margin-left: auto;
            max-width: 80%;
            border-bottom-right-radius: 0;
        }
        .assistant-message {
            background-color: #F3F4F6;
            color: black;
            border-radius: 16px;
            padding: 12px;
            margin-right: auto;
            max-width: 80%;
            border-bottom-left-radius: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src=${logo} alt="MedScan AI Logo" class="logo">
            <div class="branding-text">
                <p style="font-size: 25px; line-height: 0px; font-weight: 800; letter-spacing: 1px;">MedScan AI</p>
            </div>
        </div>

        <!-- Info -->
        <div class="info">
            <div><strong>${translate('general.createdAt')}:</strong> ${generatedAt}</div>
        </div>

    
        <!-- AI Interpretation -->
        <div style="position: relative;">
            <p class="section-title">${translate('pdfPreview.conversationTitlePdf')}</p>
            <div class="chat-container">
                ${formatChatMessages(messages)}

            </div>
        </div>

        <!-- Footer -->
        <footer style="text-align: center; padding: 20px; color: #64748B; font-size: 12px; border-top: 1px solid #E2E8F0; margin-top: 100px;">
            <p style="margin: 0;">Generated by MedScan AI • ${createdAt}</p>
            <p style="margin: 0;">The AI-generated results from MedScan AI are intended for informational purposes only and should not be used as a substitute for professional medical advice. Always seek guidance from a qualified healthcare professional for diagnosis and treatment.</p>
        </footer>
    </div>
</body>
</html>
  `;
};
// <img class="background-overlay" src=${medicalFrame} />
