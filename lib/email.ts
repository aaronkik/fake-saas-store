import sgMail from '@sendgrid/mail';

const sendgridApiKey = process.env.SENDGRID_API_KEY;
const sendgridVerifiedSenderEmail = process.env.SENDGRID_VERIFIED_SENDER_EMAIL;
const isTestEnv = process.env.NODE_ENV === 'test';

if (!sendgridApiKey) throw new Error('Missing env: SENDGRID_API_KEY');
if (!sendgridVerifiedSenderEmail)
  throw new Error('Missing env: SENDGRID_VERIFIED_SENDER_EMAIL');

sgMail.setApiKey(sendgridApiKey);

interface SendMailPayload {
  recipient: string;
  subject: string;
  message: string;
}

export const sendMail = async (payload: SendMailPayload) => {
  const { recipient, subject, message } = payload;
  const msg = {
    to: recipient,
    from: sendgridVerifiedSenderEmail,
    subject,
    text: message,
    html: `<p>${message}</p>`,
    mailSettings: { sandboxMode: { enable: isTestEnv } },
  };

  return sgMail.send(msg);
};
