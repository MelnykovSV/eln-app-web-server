import * as Express from 'express';
import { IExtendedRequest } from '../types';
const { validateRefreshToken, HttpError } = require('./../helpers/index');
const { User } = require('./../models/auth');

const authenticateRefresh = async (
  req: IExtendedRequest,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    const { refreshToken: oldRefreshToken } = req.cookies;

    const { id } = validateRefreshToken(oldRefreshToken);
    const user = await User.findById(id);

    if (!user || !user.accessToken || user.refreshToken !== oldRefreshToken) {
      throw HttpError(401);
    }

    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticateRefresh;
