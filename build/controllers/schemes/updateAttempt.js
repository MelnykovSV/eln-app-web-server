"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { HttpError, createResponse, generateAttemptUpdateBody, } = require('../../helpers/index');
const { Scheme } = require('../../models/scheme');
const updateAttempt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw HttpError(401);
    }
    const response = yield Scheme.findOneAndUpdate({
        'stages.attempts._id': req.params.attemptId,
    }, {
        $set: generateAttemptUpdateBody(req.body),
        // {
        //   'stages.$[].attempts.$[attempt].temp': '100deg',
        //   'stages.$[].attempts.$[attempt].time': '20h',
        // },
    }, {
        arrayFilters: [
            { 'attempt._id': req.params.attemptId }, // Filter for the specific stage _id
        ],
        new: true,
    });
    createResponse(res, 201, 'New scheme created', response);
});
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
