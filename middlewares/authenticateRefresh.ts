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

    const { authorization } = req.headers;

    if (!authorization || typeof authorization !== 'string') {
      throw HttpError(401);
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw HttpError(401);
    }
    const { id } = validateRefreshToken(token);
    const user = await User.findById(id);
    if (!user || !user.refreshToken || user.refreshToken !== token) {
      throw HttpError(401);
    }
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticateRefresh;
