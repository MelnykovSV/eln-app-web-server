import { IExtendedRequest } from '../../types';
const { HttpError, createResponse } = require('../../helpers/index');
const { Scheme } = require('../../models/scheme');
const dayjs = require('dayjs');

const createNewScheme = async (
  req: IExtendedRequest,
  res: Express.Response
) => {
  const user = req.user;
  if (!user) {
    throw HttpError(401);
  }

  const { mass, price, startingMaterial, targetCompound, stages, deadline } =
    req.body;

  const response = await Scheme.create({
    owner: user._id,
    mass,
    price,
    startingMaterial,
    targetCompound,
    stages,
    deadline: dayjs(deadline),
    stagesNumber: stages.length,
  });

  createResponse(res, 201, 'New scheme created', response);
};

module.exports = createNewScheme;
