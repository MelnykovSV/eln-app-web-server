const { HttpError, createResponse } = require('../../helpers/index');
const { Scheme } = require('../../models/scheme');
import { IExtendedRequest } from '../../types';

const addAttempt = async (req: IExtendedRequest, res: Express.Response) => {
  const user = req.user;

  if (!user) {
    throw HttpError(401);
  }

  const response = await Scheme.findOneAndUpdate(
    { 'stages._id': req.params.stageId },
    {
      ///Сделать не только для первого элемента!
      $push: { [`stages.${0}.attempts`]: req.body },
    },

    { new: true }
  );
  createResponse(res, 201, 'New attempt added', response);
};

module.exports = addAttempt;
