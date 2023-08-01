const sgMail = require('@sendgrid/mail');
const { nanoid } = require('nanoid');
require('dotenv').config();
const { SENDGRID_API_KEY, BASE_URL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerificationEmail = async (email: string) => {
  const verificationCode = nanoid();
  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
  };
  const letter = { ...verifyEmail, from: 'melnykov8515@gmail.com' };
  await sgMail.send(letter);

  return verificationCode;
};
module.exports = sendVerificationEmail;

export {};
