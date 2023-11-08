import * as Express from 'express';
import { IExtendedRequest } from '../../types';
const { createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');

const getCurrentUser = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  const { userName, email, avatarURL } = await User.findById(_id);

  createResponse(res, 200, 'Current user', { userName, email, avatarURL });
};

module.exports = getCurrentUser;
