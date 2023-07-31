import * as Express from 'express';
import { IError } from './../types';

const handleMongooseError = (
  error: IError,
  _data: any,
  next: Express.NextFunction
) => {
  error.status = 400;
  next();
};

module.exports = handleMongooseError;
