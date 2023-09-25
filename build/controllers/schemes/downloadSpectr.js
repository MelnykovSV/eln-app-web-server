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
const fs = require('fs/promises');
const path = require('path');
const publicDir = path.join(__dirname, '../', '../', 'public/');
const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');
const { Scheme } = require('../../models/scheme');
const downloadSpectr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { schemeId, stageId, attemptNumber, spectrId } = req.params;
    const user = yield User.findById(_id);
    if (!user) {
        throw HttpError(401);
    }
    const scheme = yield Scheme.findById(schemeId);
    console.log(scheme);
    const spectrUrl = scheme.stages
        .find((stage) => stage._id.toString() === stageId)
        .attempts[attemptNumber - 1].spectra.find((spectr) => spectr._id.toString() === spectrId).spectrUrl;
    res.download(publicDir + spectrUrl);
});
module.exports = downloadSpectr;
