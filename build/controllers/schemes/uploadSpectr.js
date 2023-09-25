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
const { nanoid } = require('nanoid');
const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const { Scheme } = require('../../models/scheme');
const spectraDir = path.join(__dirname, '../', '../', 'public/', 'spectra');
const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');
const options = {
    root: path.join(spectraDir),
};
const uploadSpectr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('here');
    const { _id } = req.user;
    const user = yield User.findById(_id);
    const { label, attemptNumber, schemeId, stageId } = req.body;
    console.log('resultUpload');
    if (!user) {
        throw HttpError(401);
    }
    if (!req.file) {
        throw HttpError(400, 'File is required');
    }
    if (!req.file.originalname.endsWith('.pdf')) {
        throw HttpError(400, 'Image has to be in .pdf fromat');
    }
    const { path: tempUpload } = req.file;
    const folders = `user_${_id}/scheme_${schemeId}/stage_${stageId}/attempt_${attemptNumber}`;
    const filename = `spectr_${nanoid()}.pdf`;
    const folderStructure = path.join(spectraDir, folders);
    const resultUpload = path.join(folderStructure, filename);
    if (fsSync.existsSync(folderStructure)) {
        console.log('The directory exists');
        yield fs.rename(tempUpload, resultUpload);
    }
    else {
        console.log('The directory does NOT exist');
        yield fs.mkdir(folderStructure, { recursive: true });
        yield fs.rename(tempUpload, resultUpload);
    }
    const spectrURL = path.join('spectra', folders, filename);
    //Записать данные в базу тут
    const response = yield Scheme.findOneAndUpdate({
        'stages._id': stageId,
    }, {
        $push: {
            'stages.$[].attempts.$[attempt].spectra': {
                label: label,
                spectrUrl: spectrURL,
            },
        },
    }, {
        arrayFilters: [
            { 'attempt.attemptNumber': attemptNumber }, // Filter for the specific stage _id
        ],
        new: true,
    });
    // console.log(
    //   response.stages.find((stage: IStage) => stage._id).attempts[
    //     attemptNumber - 1
    //   ].spectra
    // );
    //Записать данные в базу тут
    createResponse(res, 200, 'File updated', response.stages
        .find((stage) => stage._id.toString() === stageId)
        .attempts[attemptNumber - 1].spectra.map(({ label, spectrUrl, _id }) => ({ label, spectrUrl, _id })));
});
module.exports = uploadSpectr;
