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
const bcrypt = require('bcrypt');
const { HttpError, createResponse } = require('../../helpers/index');
const { User, passwordJoiSchema } = require('../../models/auth');
const changeUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const user = yield User.findById(_id);
    if (!user) {
        throw HttpError(401);
    }
    const { password: newPassword } = req.body;
    const { error } = passwordJoiSchema.validate({ password: newPassword });
    if (error) {
        throw HttpError(400, 'Invalid password');
    }
    const hashPassword = yield bcrypt.hash(newPassword, 10);
    const { userName, email, avatarURL } = yield User.findByIdAndUpdate(_id, {
        password: hashPassword,
    }, { new: true });
    createResponse(res, 200, 'User password updated succesfuly', {
        userName,
        email,
        avatarURL,
    });
});
module.exports = changeUserPassword;
