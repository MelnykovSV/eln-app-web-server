const { HttpError, createResponse } = require('../../helpers/index');
const { Scheme } = require('../../models/scheme');
import { IExtendedRequest } from '../../types';

const getSingleScheme = async (
  req: IExtendedRequest,
  res: Express.Response
) => {
  const user = req.user;

  if (!user) {
    throw HttpError(401);
  }

  const response = await Scheme.findOne(
    { _id: req.params.schemeId, owner: user._id },
    '-createdAt -updatedAt -owner'
  );

  createResponse(res, 200, 'Single scheme', response);
};

module.exports = getSingleScheme;
