import * as Express from 'express';
import { IExtendedRequest } from '../../types';
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const avatarsDir = path.join(__dirname, '../', 'public/', 'avatars');
const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');

const updateAvatar = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(401);
  }

  if (!req.file) {
    throw HttpError(400, 'Image is required');
  }

  if (
    !req.file.originalname.endsWith('.png') &&
    !req.file.originalname.endsWith('.jpg') &&
    !req.file.originalname.endsWith('.jpeg')
  ) {
    throw HttpError(400, 'Image has to be in .png or .jpg fromat');
  }

  const { path: tempUpload, originalname } = req.file;
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

module.exports = updateAvatar;
