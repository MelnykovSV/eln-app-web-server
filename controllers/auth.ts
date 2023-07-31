import * as Express from 'express';
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const {
  ctrlWrapper,
  HttpError,
  sendEmail,
  generateToken,
} = require('../helpers/index');
const { User } = require('./../models/auth');

require('dotenv').config();
const { BASE_URL } = process.env;

const registerUser = (req: Express.Request, res: Express.Response) => {};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
};

export {};
