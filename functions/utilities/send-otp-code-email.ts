import * as functions from 'firebase-functions/v1';
import { Resend } from 'resend';

const resend = new Resend('re_dCGra4pY_4wP31qMcxkRK1ZmdAz4ZTRNc');

export const sendOtpCodeViaEmail = async ({
  receiverEmail,
  subject,
  htmlTemplate,
}: {
  receiverEmail: string;
  subject: string;
  htmlTemplate: string;
}) => {
  try {
    return await resend.emails.send({
      from: 'onboarding@resend.dev', // ! change this email with you email domain
      to: receiverEmail,
      subject,
      html: htmlTemplate,
    });
  } catch (error) {
    throw new functions.https.HttpsError(
      'cancelled',
      'The verification code cannot be sent via your email!',
    );
  }
};
