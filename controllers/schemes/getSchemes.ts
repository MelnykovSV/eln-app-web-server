const {
  HttpError,
  createResponse,
  calculatePaginationParams,
} = require('../../helpers/index');
const { Scheme } = require('../../models/scheme');
import { IExtendedRequest } from '../../types';

const getSchemes = async (req: IExtendedRequest, res: Express.Response) => {
  const user = req.user;

  const { page = 1, limit = 18, schemeStatus = 'all' } = req.query;

  if (
    schemeStatus !== 'all' &&
    schemeStatus !== 'active' &&
    schemeStatus !== 'chosen' &&
    schemeStatus !== 'success' &&
    schemeStatus !== 'fail'
  ) {
    throw HttpError(400, 'Wrong scheme type');
  }

  if (!user) {
    throw HttpError(401);
  }

  if (schemeStatus === 'all') {
    const response = await Scheme.find(
      { owner: user._id },
      '-owner -stages',
      calculatePaginationParams(page, limit)
    );

    createResponse(res, 200, "User's schemes", response);
  } else {
    const response = await Scheme.find(
      { owner: user._id, status: schemeStatus },
      '-owner -stages',
      calculatePaginationParams(page, limit)
    );

    createResponse(res, 200, "User's schemes", response);
  }
};

module.exports = getSchemes;
