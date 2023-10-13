import * as Express from 'express';
import { IExtendedRequest } from '../../types';
const fs = require('fs/promises');
const path = require('path');

// const publicDir = path.join(__dirname, '../', '../', 'public/');
const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');
const { Scheme } = require('../../models/scheme');

const downloadSpectr = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  const { schemeId, stageId, attemptNumber, spectrId } = req.params;
  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(401);
  }

  const scheme = await Scheme.findById(schemeId);
  console.log(scheme);
  const spectrUrl = scheme.stages
    .find((stage: any) => stage._id.toString() === stageId)
    .attempts[(attemptNumber as any) - 1].spectra.find(
      (spectr: any) => spectr._id.toString() === spectrId
    ).spectrUrl;
  res.download(spectrUrl);
};

module.exports = downloadSpectr;
