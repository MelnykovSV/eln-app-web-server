import * as Express from 'express';

const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');

const verifyEmail = async (req: Express.Request, res: Express.Response) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(404, 'Email not found or verification code is outdated');
  }

  await User.findByIdAndUpdate(user._id, {
    verificationCode: '',
    verify: true,
  });

  // createResponse(res, 200, 'Email verified');
  res.send('<p>Email verification success!</p>');
};

module.exports = verifyEmail;
