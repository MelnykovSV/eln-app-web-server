import * as Express from 'express';
import { IExtendedRequest } from '../../types';
import { IStage, ISpectr } from '../../types';
const path = require('path');
const { Scheme } = require('../../models/scheme');

const spectraDir = path.join(__dirname, '../', '../', 'public/', 'spectra');
const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');

const options = {
  root: path.join(spectraDir),
};

const uploadSpectr = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  const { label, attemptNumber, schemeId, stageId } = req.body;
  if (!user) {
    throw HttpError(401);
  }

  if (!req.file) {
    throw HttpError(400, 'File is required');
  }


  const spectrURL = req.file.path;


  const response = await Scheme.findOneAndUpdate(
    {
      'stages._id': stageId,
    },

    {
      $push: {
        'stages.$[].attempts.$[attempt].spectra': {
          label: label,
          spectrUrl: spectrURL,
        },
      },
    },
    {
      arrayFilters: [
        { 'attempt.attemptNumber': attemptNumber }, // Filter for the specific stage _id
      ],
      new: true,
    }
  );



  createResponse(
    res,
    200,
    'File updated',
    response.stages
      .find((stage: IStage) => stage._id.toString() === stageId)
      .attempts[attemptNumber - 1].spectra.map(
        ({ label, spectrUrl, _id }: ISpectr) => ({ label, spectrUrl, _id })
      )
  );
};

module.exports = uploadSpectr;
