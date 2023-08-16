const {
  HttpError,
  createResponse,
  generateStageUpdateBody,
} = require('../../helpers/index');
const { Scheme } = require('../../models/scheme');
import { IExtendedRequest } from '../../types';

const updateStage = async (req: IExtendedRequest, res: Express.Response) => {
  const user = req.user;

  if (!user) {
    throw HttpError(401);
  }

  const response = await Scheme.findOneAndUpdate(
    {
      'stages._id': req.params.stageId,
    },

    {
      $set: generateStageUpdateBody(req.body),
    },
    {
      arrayFilters: [
        { 'stage._id': req.params.stageId }, // Filter for the specific stage _id
      ],
      new: true,
    }
  );

  createResponse(res, 201, 'New scheme created', response);
};

module.exports = updateStage;
