import * as express from 'express';
import { ObjectSchema } from 'joi';
const { HttpError } = require('../helpers/index');

const validateBody = (schema: ObjectSchema) => {
  const func = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!Object.keys(req.body).length || !req.body) {
      next(HttpError(400, 'Missing fields'));
    }
    const { error } = schema.validate(req.body);

    if (error) {
      if (error?.details[0].type === 'string.pattern.name') {
        if (error?.details[0].context?.label === 'password') {
          next(
            HttpError(
              400,
              'Password should contain at least 1 capital letter, 1 normal letter and 1 number'
            )
          );
        }
        if (error?.details[0].context?.label === 'userName') {
          next(
            HttpError(
              400,
              'Username can contain only letters, numbers and underscores'
            )
          );
        }
        if (error?.details[0].context?.label === 'email') {
          next(
            HttpError(
              400,
              'Invalid email'
            )
          );
        }
      }
      next(HttpError(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validateBody;

export {};
