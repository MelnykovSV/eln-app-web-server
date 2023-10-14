import * as Express from 'express';
import { IExtendedRequest } from '../../types';
import { IStage, ISpectr } from '../../types';
const { Scheme } = require('../../models/scheme');
const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');
const cloudinary = require('cloudinary').v2;

const deleteSpectr = async (req: IExtendedRequest, res: Express.Response) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  const { spectrId, attemptNumber, stageId, publicId }: any = req.params;
  const {} = req.body;
  if (!user) {
    throw HttpError(401);
  }

  const response = await Scheme.findOneAndUpdate(
    {
      'stages._id': stageId,
    },

    {
      $pull: {
        'stages.$[].attempts.$[attempt].spectra': { _id: spectrId },
      },
    },
    {
      arrayFilters: [{ 'attempt.attemptNumber': attemptNumber }],
      new: true,
    }
  );

  cloudinary.uploader.destroy(publicId);

  createResponse(
    res,
    200,
    'File deleted',
    response.stages
      .find((stage: IStage) => stage._id.toString() === stageId)
      .attempts[attemptNumber - 1].spectra.map(
        ({ label, spectrUrl, _id }: ISpectr) => ({ label, spectrUrl, _id })
      )
  );
};

module.exports = deleteSpectr;
