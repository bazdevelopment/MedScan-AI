/*
 * Function used to send HTML template via email to the user in order to receive the confirmation code
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
      <title>X-Ray Analyzer Email Confirmation</title>
  </head>
  <body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #F1EEFB;">
      <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="background-color: #9DA4FE; max-width: 600px; margin: 20px auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <tr>
              <td style="padding: 25px; text-align: center;">
                  <h2 style="color: #ffffff; margin-bottom: 15px; font-size: 24px; font-weight: bold;">X-Ray Analyzer Email Confirmation</h2>
                  <p style="color: #ffffff; font-size: 18px; margin: 10px 0;">Hello ${userName},</p>
                  <p style="color: #ffffff; font-size: 16px; margin: 10px 0;">Thank you for using X-Ray Analyzer! Your confirmation code is:</p>
                  <div style="background-color: #ffffff; color: #A935F8; font-size: 32px; padding: 15px 30px; border-radius: 8px; font-weight: bold; margin: 20px 0;">
                      ${otpCode}
                  </div>
                  <p style="color: #ffffff; font-size: 16px; margin-top: 15px;">Please use this code to confirm your identity in X-Ray Analyzer.</p>
                  <p style="color: #ffffff; font-size: 14px; margin-top: 20px;">If you didn't request this code, please ignore this email.</p>
              </td>
          </tr>
      </table>
  </body>
  </html>
`;
  return template;
};
