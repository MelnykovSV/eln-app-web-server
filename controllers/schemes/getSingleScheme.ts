const { HttpError, createResponse } = require('../../helpers/index');
const { Scheme } = require('../../models/scheme');
import { IExtendedRequest } from '../../types';
const ObjectId = require('mongoose').Types.ObjectId;

const getSingleScheme = async (
  req: IExtendedRequest,
  res: Express.Response
) => {
  const user = req.user;

  if (!user) {
    throw HttpError(401);
  }

  if (!ObjectId.isValid(req.params.schemeId)) {
    throw HttpError(400, 'Invalid ID');
  }

  const response = await Scheme.findOne(
    { _id: req.params.schemeId, owner: user._id },
    ' -owner'
  );
  if (!response) {
    throw HttpError(404, 'Scheme not found');
  }
  createResponse(res, 200, 'Single scheme', response);
};

module.exports = getSingleScheme;
