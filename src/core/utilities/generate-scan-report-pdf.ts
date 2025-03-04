/* eslint-disable max-lines-per-function */

import { Image, Platform } from 'react-native';

import { colors } from '@/ui';

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
  interpretation,
  promptMessage,
  generatedAt,
}: IGenerateScanReportPdf) => {
  const logo = Platform.select({
    ios: Image.resolveAssetSource(require('assets/icon_transparent.png')).uri,
    android: getAndroidReleaseImageURI('icon_transparent.png'),
  });

  const medicalFrame = Platform.select({
    ios: Image.resolveAssetSource(require('assets/medical_frame.png')).uri,
    android: getAndroidReleaseImageURI('medical_frame.png'),
  });

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
        }
        .container {
            background: white;
            padding: 40px;
            border:1px solid ${colors.lightGray};
            border-radius:30px;
          
        }
        .header {
            text-align: center;
            display:flex;
            flex-direction:row;
            justify-content:center;
          align-items:center;
            gap:10px;
        }
        .branding-text{
        display:flex;
        flex-direction:column;
        margin-top:-5px;
        margin-left:5px;
        }

        .background-overlay{
        position:absolute;
        left:25%;
        opacity:0.7;

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
            margin-top:25px;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #7982FD;
            margin-bottom: 5px;
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
    </style>
</head>
<body>

    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src=${logo} alt="MedScan AI Logo" class="logo">
            <div class="branding-text">
            <p style="font-size:25px; line-height:0px; font-weight:800; letter-spacing:1px">MedScan AI</p>
             </div>
        </div>
<p style="text-align: center; font-size:24px; font-weight:700; display:none">${translate('rootLayout.screens.generateReportScreen.medicalReport')}</p> 


        <!-- Info -->
        <div class="info">
            <div><strong>${translate('general.createdAt')}:</strong> ${generatedAt}</div>
        </div>

        <!-- Analysis Prompt -->
        <div>
            <p class="section-title">${translate('rootLayout.screens.generateReportScreen.userInput')}</p>
            <p class="content">${promptMessage || '-'}</p>
        </div>

        <!-- AI Interpretation -->
        <div style="position:relative">
            <img class="background-overlay" src=${medicalFrame} />
            <p class="section-title">${translate(
              'rootLayout.screens.generateReportScreen.report',
            )}</p>
            <p class="content">
              ${interpretation}
                </p>

        </div>

        <!-- Footer -->
         <footer style="
          text-align: center;
          padding: 20px;
          color: #64748b;
          font-size: 12px;
          border-top: 1px solid #e2e8f0;
          margin-top: 100px;
          
        ">
          <p style="margin: 0;">Generated by MedScan AI • ${createdAt}</p>
          <p style="margin: 0;">The AI-generated results from MedScan AI are intended for informational purposes only and should not be used as a substitute for professional medical advice. Always seek guidance from a qualified healthcare professional for diagnosis and treatment.
</p>

        </footer>

    </div>
</body>
</html>
  `;
};
