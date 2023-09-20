import * as Express from 'express';
import { IExtendedRequest } from '../../types';
const fs = require('fs/promises');
const path = require('path');

const spectraDir = path.join(__dirname, '../', '../', 'public/', 'spectra');
const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');

const downloadSpectr = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  console.log(req);

  if (!user) {
    throw HttpError(401);
  }
  //   res.status(200);
  res.download(spectraDir + '/test.pdf');
};

module.exports = downloadSpectr;
