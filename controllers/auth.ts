import * as Express from 'express';
import { IExtendedRequest } from '../types';
const bcrypt = require('bcrypt');
// const { nanoid } = require('nanoid');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const avatarsDir = path.join(__dirname, '../', 'public/', 'avatars');
const {
  ctrlWrapper,
  HttpError,
  sendVerificationEmail,
  generateTokens,
  createResponse,
} = require('../helpers/index');
const {
  User,
  userNameJoiSchema,
  passwordJoiSchema,
  emailJoiSchema,
} = require('./../models/auth');

// require('dotenv').config();
// const { BASE_URL } = process.env;

const registerUser = async (req: Express.Request, res: Express.Response) => {
  const { email, password, userName } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const verificationCode = await sendVerificationEmail(email);

  const hashPassword = await bcrypt.hash(password, 10);
  const { _id, avatarURL } = await User.create({
    ...req.body,
    password: hashPassword,
    verificationCode,
  });

  const { accessToken, refreshToken } = generateTokens(_id);

  await User.findByIdAndUpdate(_id, {
    accessToken,
    refreshToken,
  });

  const data = {
    accessToken,
    refreshToken,
    user: {
      userName,
      email,
      avatarURL,
    },
  };
  createResponse(res, 201, 'New user created', data);
};

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
    refreshToken,
    user: {
      userName,
      email,
      avatarURL,
    },
  };
  createResponse(res, 201, 'Login successful', data);
};

const logoutUser = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, {
    accessToken: '',
    refreshToken: '',
  });
  createResponse(res, 200, 'Logout success');
};

const getCurrentUser = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  console.log(req.user);
  const { userName, email, avatarURL } = await User.findById(_id);

  createResponse(res, 200, 'Current user', { userName, email, avatarURL });
};

const updateAvatar = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(401);
  }

  const { path: tempUpload, originalname } = req.file!;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  Jimp.read(tempUpload, (err: Error, avatar: typeof Jimp) => {
    if (err) throw err;
    avatar
      .resize(250, 250) // resize
      .quality(60) // set JPEG quality
      .write(resultUpload); // save
  });

  await fs.unlink(tempUpload);
  const avatarURL = path.join('avatars', filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  createResponse(res, 200, 'User avatar updated', { avatarURL });
};

const changeUserName = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(401);
  }
  const { userName: newUserName } = req.body;

  const isUserNameTaken = await User.findOne({ userName: newUserName });

  if (isUserNameTaken) {
    throw HttpError(400, 'This user name is already taken');
  }

  const { error } = userNameJoiSchema.validate({ userName: newUserName });

  if (error) {
    throw HttpError(400, 'Invalid user name');
  }

  const { userName, email, avatarURL } = await User.findByIdAndUpdate(
    _id,
    {
      userName: newUserName,
    },
    { new: true }
  );

  createResponse(res, 200, 'User name updated succesfuly', {
    userName,
    email,
    avatarURL,
  });
};

const changeUserEmail = async (
  req: IExtendedRequest,
  res: Express.Response
) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(401);
  }
  const { email: newEmail } = req.body;

  const isEmailTaken = await User.findOne({ email: newEmail });

  if (isEmailTaken) {
    throw HttpError(400, 'This email is already taken');
  }
  const { error } = emailJoiSchema.validate({ email: newEmail });
  if (error) {
    throw HttpError(400, 'Invalid user name');
  }

  const { userName, email, avatarURL } = await User.findByIdAndUpdate(
    _id,
    {
      email: newEmail,
    },
    { new: true }
  );

  createResponse(res, 200, 'User email updated succesfuly', {
    userName,
    email,
    avatarURL,
  });
};
const changeUserPassword = async (
  req: IExtendedRequest,
  res: Express.Response
) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(401);
  }
  const { password: newPassword } = req.body;

  const { error } = passwordJoiSchema.validate({ password: newPassword });
  if (error) {
    throw HttpError(400, 'Invalid password');
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);
  const { userName, email, avatarURL } = await User.findByIdAndUpdate(
    _id,
    {
      password: hashPassword,
    },
    { new: true }
  );

  createResponse(res, 200, 'User password updated succesfuly', {
    userName,
    email,
    avatarURL,
  });
};

const verifyEmail = async (req: Express.Request, res: Express.Response) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(404, 'Email not found or verification code is outdated');
  }

  await User.findByIdAndUpdate(user._id, {
    verificationCode: '',
    verify: true,
  });

  createResponse(res, 200, 'Email verified');
};

const resendEmail = async (req: Express.Request, res: Express.Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, 'Email not found or verification code is outdated');
  }

  const verificationCode = await sendVerificationEmail(email);

  await User.findByIdAndUpdate(user._id, { verificationCode });

  createResponse(res, 200, 'Verification link has been sent to you email');
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendEmail: ctrlWrapper(resendEmail),
  logoutUser: ctrlWrapper(logoutUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  changeUserName: ctrlWrapper(changeUserName),
  changeUserEmail: ctrlWrapper(changeUserEmail),
  changeUserPassword: ctrlWrapper(changeUserPassword),
  updateAvatar: ctrlWrapper(updateAvatar),
};

export {};
