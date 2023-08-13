import * as Express from 'express';
import { IExtendedRequest } from '../../types';
const { HttpError, createResponse } = require('../../helpers/index');
const { User, userNameJoiSchema } = require('../../models/auth');

const changeUserName = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(401);
  }
  const { userName: newUserName } = req.body;

  const isUserNameTaken = await User.findOne({ userName: newUserName });

  if (isUserNameTaken) {
    throw HttpError(409, 'This user name is already taken');
  }

  const { error } = userNameJoiSchema.validate({ userName: newUserName });

  if (error) {
    throw HttpError(400, 'Invalid user name');
  }

  const { userName, email, avatarURL } = await User.findByIdAndUpdate(
    _id,
    {
      userName: newUserName,
    },
    { new: true }
  );

  createResponse(res, 200, 'User name updated succesfuly', {
    userName,
    email,
    avatarURL,
  });
};

module.exports = changeUserName;
