import * as Express from 'express';
import { IError } from './types';
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const authRouter = require('./routes/api/auth');
const schemesRouter = require('./routes/api/schemes');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// routers
app.use('/api/auth', authRouter);
app.use('/api/schemes', schemesRouter);

app.use((_: Express.Request, res: Express.Response) => {
  res.status(400).json({
    status: 'error',
    code: 400,
    message: 'bad request',
  });
});

app.use(
  (
    err: IError,
    _: Express.Request,
    res: Express.Response,
    __: Express.NextFunction
  ) => {
    const { status = 500, message = 'Internal Server Error' } = err;

    res.status(status).json({
      status: 'error',
      code: status,
      message: message,
    });
  }
);

module.exports = app;
