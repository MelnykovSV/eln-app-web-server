const { HttpError, createResponse } = require('../../helpers/index');
const { Scheme } = require('../../models/scheme');
import { IExtendedRequest } from '../../types';

const getSchemes = async (req: IExtendedRequest, res: Express.Response) => {
  const user = req.user;

  if (!user) {
    throw HttpError(401);
  }

  const response = await Scheme.find(
    { owner: user._id },
    '-createdAt -updatedAt -owner -stages'
  );

  createResponse(res, 200, "User's schemes", response);
};

module.exports = getSchemes;
