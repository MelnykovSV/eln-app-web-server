import * as Express from 'express';

const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');

const confirmEmailChange = async (
  req: Express.Request,
  res: Express.Response
) => {
  const { verificationCode, email } = req.params;

  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(404, 'Email not found or verification code is outdated');
  }
  await User.findByIdAndUpdate(user._id, {
    email,
    verificationCode: '',
  });

  createResponse(res, 200, 'Email successfuly changed');
};

module.exports = confirmEmailChange;
