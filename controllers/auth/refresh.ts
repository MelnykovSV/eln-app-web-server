import * as Express from 'express';
import { IExtendedRequest } from '../../types';

const { generateTokens, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');

const refresh = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  const { accessToken, refreshToken } = generateTokens(_id);

  await User.findByIdAndUpdate(_id, { accessToken, refreshToken });

  // res.cookie('refreshToken', refreshToken, {
  //   maxAge: 30 * 24 * 60 * 60 * 1000,
  //   httpOnly: true,
  // });

  const data = {
    accessToken,
    refreshToken,
  };

  createResponse(res, 200, 'Tokens refreshed', data);
};

module.exports = refresh;
