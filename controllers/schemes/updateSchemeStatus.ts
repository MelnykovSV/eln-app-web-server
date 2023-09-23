const { HttpError, createResponse } = require('../../helpers/index');
const { Scheme } = require('../../models/scheme');
import { IExtendedRequest } from '../../types';

const updateSchemeStatus = async (req: IExtendedRequest, res: Express.Response) => {
  const user = req.user;

  if (!user) {
    throw HttpError(401);
  }

  const response = await Scheme.findByIdAndUpdate(req.params.schemeId, {
    status: req.body.status,
  });

  createResponse(res, 201, 'Stage updated', response);
};

module.exports = updateSchemeStatus;
