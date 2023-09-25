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
const { HttpError, createResponse } = require('../../helpers/index');
const { User, userNameJoiSchema } = require('../../models/auth');
const changeUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const user = yield User.findById(_id);
    if (!user) {
        throw HttpError(401);
    }
    const { userName: newUserName } = req.body;
    const isUserNameTaken = yield User.findOne({ userName: newUserName });
    if (isUserNameTaken) {
        throw HttpError(409, 'This user name is already taken');
    }
    const { error } = userNameJoiSchema.validate({ userName: newUserName });
    if (error) {
        throw HttpError(400, 'Invalid user name');
    }
    const { userName, email, avatarURL } = yield User.findByIdAndUpdate(_id, {
        userName: newUserName,
    }, { new: true });
    createResponse(res, 200, 'User name updated succesfuly', {
        userName,
        email,
        avatarURL,
    });
});
module.exports = changeUserName;
