import * as Express from 'express';
import { IExtendedRequest } from '../../types';
import { IStage, ISpectr } from '../../types';
const { nanoid } = require('nanoid');
const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const { Scheme } = require('../../models/scheme');

const spectraDir = path.join(__dirname, '../', '../', 'public/', 'spectra');
const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');

const options = {
  root: path.join(spectraDir),
};

const uploadSpectr = async (req: IExtendedRequest, res: Express.Response) => {
  console.log('here');
  const { _id } = req.user;
  const user = await User.findById(_id);
  const { label, attemptNumber, schemeId, stageId } = req.body;
  console.log('resultUpload');
  if (!user) {
    throw HttpError(401);
  }

  if (!req.file) {
    throw HttpError(400, 'File is required');
  }

  if (!req.file.originalname.endsWith('.pdf')) {
    throw HttpError(400, 'Image has to be in .pdf fromat');
  }

  // const { path: tempUpload } = req.file;
  // const folders = `user_${_id}/scheme_${schemeId}/stage_${stageId}/attempt_${attemptNumber}`;
  // const filename = `spectr_${nanoid()}.pdf`;

  // const folderStructure = path.join(spectraDir, folders);
  // const resultUpload = path.join(folderStructure, filename);
  // if (fsSync.existsSync(folderStructure)) {
  //   console.log('The directory exists');
  //   await fs.rename(tempUpload, resultUpload);
  // } else {
  //   console.log('The directory does NOT exist');
  //   await fs.mkdir(folderStructure, { recursive: true });
  //   await fs.rename(tempUpload, resultUpload);
  // }

  // const spectrURL = path.join('spectra', folders, filename);
  const spectrURL = req.file.path;

  //Записать данные в базу тут

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

  // console.log(
  //   response.stages.find((stage: IStage) => stage._id).attempts[
  //     attemptNumber - 1
  //   ].spectra
  // );

  //Записать данные в базу тут

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
