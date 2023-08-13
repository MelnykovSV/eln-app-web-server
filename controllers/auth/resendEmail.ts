import * as Express from 'express';

const {
  HttpError,
  sendVerificationEmail,
  createResponse,
} = require('../../helpers/index');
const { User } = require('../../models/auth');

const resendEmail = async (req: Express.Request, res: Express.Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, 'Email not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Email is already verified');
  }

  const verificationCode = await sendVerificationEmail(email);

  await User.findByIdAndUpdate(user._id, { verificationCode });

  createResponse(res, 200, 'Verification link has been sent to you email');
};

module.exports = resendEmail;
