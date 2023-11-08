const {
  HttpError,
  createResponse,
  generateAttemptUpdateBody,
} = require('../../helpers/index');
const { Scheme } = require('../../models/scheme');
import { IExtendedRequest } from '../../types';

const updateAttempt = async (req: IExtendedRequest, res: Express.Response) => {
  const user = req.user;

  if (!user) {
    throw HttpError(401);
  }

  const response = await Scheme.findOneAndUpdate(
    {
      'stages.attempts._id': req.params.attemptId,
    },

    {
      $set: generateAttemptUpdateBody(req.body),
    },
    {
      arrayFilters: [
        { 'attempt._id': req.params.attemptId }, // Filter for the specific stage _id
      ],
      new: true,
    }
  );

  createResponse(res, 201, 'New scheme created', response);
};

module.exports = updateAttempt;

