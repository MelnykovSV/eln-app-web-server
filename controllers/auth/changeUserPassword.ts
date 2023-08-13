import * as Express from 'express';
import { IExtendedRequest } from '../../types';
const bcrypt = require('bcrypt');

const { HttpError, createResponse } = require('../../helpers/index');
const { User, passwordJoiSchema } = require('../../models/auth');

const changeUserPassword = async (
  req: IExtendedRequest,
  res: Express.Response
) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(401);
  }
  const { password: newPassword } = req.body;

  const { error } = passwordJoiSchema.validate({ password: newPassword });
  if (error) {
    throw HttpError(400, 'Invalid password');
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);
  const { userName, email, avatarURL } = await User.findByIdAndUpdate(
    _id,
    {
      password: hashPassword,
    },
    { new: true }
  );

  createResponse(res, 200, 'User password updated succesfuly', {
    userName,
    email,
    avatarURL,
  });
};

module.exports = changeUserPassword;
