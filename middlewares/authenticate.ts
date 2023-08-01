import * as Express from 'express';
import { IExtendedRequest } from '../types';
const { validateAccessToken, HttpError } = require('./../helpers/index');
const { User } = require('./../models/auth');

const authenticate = async (
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

    const { id } = validateAccessToken(token);
    const user = await User.findById(id);
    if (!user || !user.accessToken || user.accessToken !== token) {
      throw HttpError(401);
    }

    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
