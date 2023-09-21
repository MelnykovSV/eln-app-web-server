import * as Express from 'express';
import { IExtendedRequest } from '../../types';
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
  const { _id } = req.user;
  const user = await User.findById(_id);
  const { label, attemptNumber, schemeId, stageId } = req.body;
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
  const folders = `user_${_id}/scheme_${schemeId}/stage_${stageId}/attempt_${attemptNumber}`;
  const filename = `spectr_${nanoid()}.pdf`;

  const folderStructure = path.join(spectraDir, folders);
  const resultUpload = path.join(folderStructure, filename);
  if (fsSync.existsSync(folderStructure)) {
    console.log('The directory exists');
    await fs.rename(tempUpload, resultUpload);
  } else {
    console.log('The directory does NOT exist');
    await fs.mkdir(folderStructure, { recursive: true });
    await fs.rename(tempUpload, resultUpload);
  }

  const spectrURL = path.join('spectra', folders, filename);

  //Записать данные в базу тут

  try {
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

    console.log(response);
  } catch (e) {
    console.log(e);
  }

  //Записать данные в базу тут

  createResponse(res, 200, 'File updated', {
    spectrURL,
    label,
    attemptNumber,
  });
};

module.exports = uploadSpectr;
