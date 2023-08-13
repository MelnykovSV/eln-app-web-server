import * as Express from 'express';

import { IExtendedRequest } from '../../types';

const {
  HttpError,
  sendVerificationEmail,
  createResponse,
} = require('../../helpers/index');
const { User, emailJoiSchema } = require('../../models/auth');

const changeUserEmail = async (
  req: IExtendedRequest,
  res: Express.Response
) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(401);
  }
  const { email: newEmail } = req.body;

  const isEmailTaken = await User.findOne({ email: newEmail });

  if (isEmailTaken) {
    throw HttpError(409, 'This email is already taken');
  }
  const { error } = emailJoiSchema.validate({ email: newEmail });
  if (error) {
    throw HttpError(400, 'Invalid user name');
  }
  const verificationCode = await sendVerificationEmail(newEmail, true);

  await User.findByIdAndUpdate(
    _id,
    {
      verificationCode,
    },
    { new: true }
  );

  createResponse(res, 200, 'Verification link was sent to your new email');
};

module.exports = changeUserEmail;
