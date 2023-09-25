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
const { HttpError, sendVerificationEmail, createResponse, } = require('../../helpers/index');
const { User } = require('../../models/auth');
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, userName } = req.body;
    const isEmailInUse = yield User.findOne({ email });
    if (isEmailInUse) {
        throw HttpError(409, 'Email already in use');
    }
    const isUserNameInUse = yield User.findOne({ userName });
    if (isUserNameInUse) {
        throw HttpError(409, 'User name already in use');
    }
    const verificationCode = yield sendVerificationEmail(email);
    const hashPassword = yield bcrypt.hash(password, 10);
    const { _id, avatarURL } = yield User.create(Object.assign(Object.assign({}, req.body), { password: hashPassword, verificationCode }));
    const data = {
        user: {
            userName,
            email,
            avatarURL,
        },
    };
    createResponse(res, 201, 'New user created', data);
});
module.exports = registerUser;
