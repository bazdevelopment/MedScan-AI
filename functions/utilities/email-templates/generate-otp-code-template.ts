/* eslint-disable max-lines-per-function */
/*
 * Function used to send HTML template via email to the user in order to receive the confirmation code
 * add this line when univeral link ticket is done (this format is not supported for deep links in gmail)
 * <a style="color: #FFFFFF" class="cta-button" href='xrayanalyzer://verify-auth-code?code=${verifyCode}'>Verify My Account</a>

 */

export const generateOptCodeTemplate = (
  userName: string,
  otpCode: string,
): string => {
  const template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>X-Ray Analyzer - Verification Code</title>
  <style>
    body {
      font-family: 'Nunito', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #FAFAFF; /* primary[50] */
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #FFFFFF;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #7982FD; /* primary[900] */
      padding: 20px;
      text-align: center;
    }
    .header img {
      width: 80px;
      height: 80px;
    }
    .header h1 {
      color: #FFFFFF;
      font-size: 24px;
      margin: 10px 0 0;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content h2 {
      color: #7982FD; /* primary[900] */
      font-size: 20px;
      margin-bottom: 15px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      color: #555;
    }
    .verification-code {
      display: inline-block;
      margin: 20px 0;
      padding: 15px 25px;
      background-color: #F0F1FF; /* primary[100] */
      color: #7982FD; /* primary[base] */
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 5px;
      border-radius: 8px;
      border: 2px dashed #7982FD; /* primary[base] */
    }
    .cta-button {
      display: inline-block;
      margin: 20px 0;
      padding: 12px 24px;
      background-color: #7982FD; /* primary[base] */
      color: #FFFFFF;
      text-decoration: none;
      border-radius: 8px;
      font-size: 16px;
      transition: background-color 0.3s ease;
    }
    .cta-button:hover {
      background-color: #7982FD; /* primary[900] */
    }
    .footer {
      background-color: #FAFAFF; /* primary[50] */
      padding: 15px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
    .footer a {
      color:#7982FD; /* primary[base] */
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header Section -->
    <div class="header">
      <img src="https://firebasestorage.googleapis.com/v0/b/x-ray-analizer-dev.firebasestorage.app/o/assets%2Ficon_transparent.png?alt=media&token=968f8335-f92e-48e7-8276-778961a34dc7" alt="X-Ray Analyzer Logo">
      <h1>X-Ray Analyzer</h1>
    </div>

    <!-- Content Section -->
    <div class="content">
      <h2>Your Verification Code</h2>
      <p>Hi <strong>${userName}</strong>,</p>
      <p>Thank you for using <strong>X-Ray Analyzer</strong>. To complete your verification, please use the following 6-digit code:</p>
      <div class="verification-code">${otpCode}</div>
      <p>This code will expire in <strong>5 minutes</strong>. Please do not share it with anyone.</p>
      <p>If you did not request this code, please ignore this email or contact our support team immediately.</p>
    </div>

    <!-- Footer Section -->
    <div class="footer">
      <p>If you have any questions, feel free to <a href="mailto:xrayanalyzer@gmail.com">contact us</a>.</p>
      <p>&copy; 2025 X-Ray Analyzer. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
  return template;
};
