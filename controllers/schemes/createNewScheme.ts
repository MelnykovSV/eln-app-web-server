const { HttpError, createResponse } = require('../../helpers/index');
const { Scheme } = require('../../models/scheme');
import { IExtendedRequest } from '../../types';

const createNewScheme = async (
  req: IExtendedRequest,
  res: Express.Response
) => {
  const { _id: owner } = req.user;

  const { mass, price, startingMaterial, targetCompound } = req.body;

  const response = await Scheme.create({
    owner,
    mass,
    price,
    startingMaterial,
    targetCompound,
  });

  createResponse(res, 201, 'New scheme created', response);
};

module.exports = createNewScheme;
