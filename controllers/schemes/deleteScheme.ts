const { HttpError, createResponse } = require('../../helpers/index');
const { Scheme } = require('../../models/scheme');
import { IExtendedRequest } from '../../types';

const deleteScheme = async (req: IExtendedRequest, res: Express.Response) => {
  const user = req.user;

  const { id } = req.params;

  if (!user) {
    throw HttpError(401);
  }

  const response = await Scheme.findByIdAndDelete(id);

  createResponse(res, 200, 'Scheme deleted', response);
};

module.exports = deleteScheme;



