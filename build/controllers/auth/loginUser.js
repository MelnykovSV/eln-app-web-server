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
const { HttpError, generateTokens, createResponse, } = require('../../helpers/index');
const { User } = require('../../models/auth');
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: loginEmail, password: loginPassword } = req.body;
    const user = yield User.findOne({ email: loginEmail });
    if (!user) {
        throw HttpError(401, 'Email or password invalid');
    }
    if (!user.verify) {
        throw HttpError(401, 'Email is not verified');
    }
    const { password, _id, userName, email, avatarURL } = user;
    const isPasswordCorrect = yield bcrypt.compare(loginPassword, password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
        throw HttpError(401, 'Email or password invalid');
    }
    const { accessToken, refreshToken } = generateTokens(_id);
    yield User.findByIdAndUpdate(_id, { accessToken, refreshToken });
    const data = {
        accessToken,
        refreshToken,
        user: {
            userName,
            email,
            avatarURL,
        },
    };
    // res.cookie('refreshToken', refreshToken, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    // });
    createResponse(res, 200, 'Login successful', data);
});
module.exports = loginUser;
