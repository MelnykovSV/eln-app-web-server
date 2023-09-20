import * as Express from 'express';
import { IExtendedRequest } from '../../types';
const fs = require('fs/promises');
const path = require('path');

const spectraDir = path.join(__dirname, '../', '../', 'public/', 'spectra');
const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');

const options = {
  root: path.join(spectraDir),
};

const uploadSpectr = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  const { label, attemptNumber } = req.body;
  console.log('resultUpload');
  if (!user) {
    throw HttpError(401);
  }

  //   console.log(req.file);

  if (!req.file) {
    throw HttpError(400, 'File is required');
  }

  //   if (
  //     !req.file.originalname.endsWith('.png') &&
  //     !req.file.originalname.endsWith('.jpg') &&
  //     !req.file.originalname.endsWith('.jpeg')
  //   ) {
  //     throw HttpError(400, 'Image has to be in .png or .jpg fromat');
  //   }

  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(spectraDir, filename);

  try {
    await fs.rename(tempUpload, resultUpload);
  } catch (err) {
    await fs.unlink(tempUpload);
    console.log(err);
    throw HttpError(err);
  }

  //   await fs.unlink(tempUpload);
  const spectraURL = path.join('spectra', filename);

  console.log(spectraURL);
  console.log(resultUpload);

  //   await User.findByIdAndUpdate(_id, { spectraURL }); ///переделать
  //   try {
  //     const response = await res.download(resultUpload, 'test.pdf');
  //     console.log(response);
  //   } catch (e) {
  //     console.log(e);
  //   }

  createResponse(res, 200, 'File updated', {
    spectraURL,
    label,
    attemptNumber,
  });
};

module.exports = uploadSpectr;
