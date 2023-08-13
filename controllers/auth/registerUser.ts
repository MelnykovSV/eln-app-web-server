import * as Express from 'express';
const bcrypt = require('bcrypt');

const {
  HttpError,
  sendVerificationEmail,
  createResponse,
} = require('../../helpers/index');
const { User } = require('../../models/auth');

const registerUser = async (req: Express.Request, res: Express.Response) => {
  const { email, password, userName } = req.body;
  const isEmailInUse = await User.findOne({ email });
  if (isEmailInUse) {
    throw HttpError(409, 'Email already in use');
  }
  const isUserNameInUse = await User.findOne({ userName });
  if (isUserNameInUse) {
    throw HttpError(409, 'User name already in use');
  }

  const verificationCode = await sendVerificationEmail(email);

  const hashPassword = await bcrypt.hash(password, 10);
  const { _id, avatarURL } = await User.create({
    ...req.body,
    password: hashPassword,
    verificationCode,
  });

  const data = {
    user: {
      userName,
      email,
      avatarURL,
    },
  };

  createResponse(res, 201, 'New user created', data);
};

module.exports = registerUser;
