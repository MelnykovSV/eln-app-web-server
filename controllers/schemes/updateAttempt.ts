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
      // {
      //   'stages.$[].attempts.$[attempt].temp': '100deg',
      //   'stages.$[].attempts.$[attempt].time': '20h',
      // },
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

// const response = await Scheme.findOneAndUpdate(
//   { 'stages._id': req.params.stageId },
//   {
//     $set: { [`stages.${0}.attempts`]: req.body },
//   },
//   // { arrayFilters: [{ 'elem.time': { $eq: '8h' } }] }
//   { returnNewDocument: true }
// );

//  Working version of nested array element update
// const response = await Scheme.findOneAndUpdate(
//   {
//     'stages._id': req.params.stageId,
//   },

//   {
//     $set: {
//       'stages.$[stage].startingMaterial': 'CCCCCCCCC',
//       'stages.$[stage].targetCompound': 'CCCCCCCCC',
//     },
//   },
//   {
//     arrayFilters: [
//       { 'stage._id': req.params.stageId }, // Filter for the specific stage _id
//     ],
//     new: true,
//   }
// );
