import * as Express from 'express';
import { IExtendedRequest } from '../../types';

const { createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');

const logoutUser = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, {
    accessToken: '',
    refreshToken: '',
  });
  createResponse(res, 200, 'Logout success');
};

module.exports = logoutUser;
