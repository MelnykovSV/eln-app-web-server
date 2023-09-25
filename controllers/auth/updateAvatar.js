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
const Jimp = require('jimp');
const avatarsDir = path.join(__dirname, '../', '../', 'public/', 'avatars');
const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');
const updateAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const user = yield User.findById(_id);
    if (!user) {
        throw HttpError(401);
    }
    if (!req.file) {
        throw HttpError(400, 'Image is required');
    }
    if (!req.file.originalname.endsWith('.png') &&
        !req.file.originalname.endsWith('.jpg') &&
        !req.file.originalname.endsWith('.jpeg')) {
        throw HttpError(400, 'Image has to be in .png or .jpg fromat');
    }
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    Jimp.read(tempUpload, (err, avatar) => {
        if (err)
            throw err;
        avatar
            .resize(250, 250) // resize
            .quality(60) // set JPEG quality
            .write(resultUpload); // save
    });
    yield fs.unlink(tempUpload);
    const avatarURL = path.join('avatars', filename);
    yield User.findByIdAndUpdate(_id, { avatarURL });
    createResponse(res, 200, 'User avatar updated', { avatarURL });
});
module.exports = updateAvatar;
