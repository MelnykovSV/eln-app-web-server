import * as Express from 'express';
const bcrypt = require('bcrypt');

const {
  HttpError,
  generateTokens,
  createResponse,
} = require('../../helpers/index');
const { User } = require('../../models/auth');

const loginUser = async (req: Express.Request, res: Express.Response) => {
  const { email: loginEmail, password: loginPassword } = req.body;

  const user = await User.findOne({ email: loginEmail });

  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }

  if (!user.verify) {
    throw HttpError(401, 'Email is not verified');
  }

  const { password, _id, userName, email, avatarURL } = user;
  const isPasswordCorrect = await bcrypt.compare(loginPassword, password);
  console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw HttpError(401, 'Email or password invalid');
  }

  const { accessToken, refreshToken } = generateTokens(_id);

  await User.findByIdAndUpdate(_id, { accessToken, refreshToken });

  const data = {
    accessToken,

    user: {
      userName,
      email,
      avatarURL,
    },
  };
  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  createResponse(res, 200, 'Login successful', data);
};

module.exports = loginUser;
