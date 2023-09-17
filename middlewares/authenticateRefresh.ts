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
    // const { refreshToken: oldRefreshToken } = req.cookies;

    // const { id } = validateRefreshToken(oldRefreshToken);
    // const user = await User.findById(id);

    // if (!user || !user.accessToken || user.refreshToken !== oldRefreshToken) {
    //   throw HttpError(401);
    // }

    // req.user = user;

    // next();
    const { authorization } = req.headers;

    if (!authorization || typeof authorization !== 'string') {
      throw HttpError(401);
    }

    const [bearer, token] = authorization.split(' ');

    console.log(token);
    if (bearer !== 'Bearer') {
      throw HttpError(401);
    }
    console.log(token);
    const { id } = validateRefreshToken(token);
    const user = await User.findById(id);
    if (!user || !user.refreshToken || user.refreshToken !== token) {
      throw HttpError(401);
    }
    console.log(token);
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticateRefresh;
