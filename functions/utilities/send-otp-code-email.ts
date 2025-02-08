import * as functions from 'firebase-functions/v1';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
      from: process.env.RESEND_SENDER_EMAIL as string,
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
