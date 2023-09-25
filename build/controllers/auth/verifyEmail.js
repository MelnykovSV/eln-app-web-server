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
const { User } = require('../../models/auth');
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { verificationCode } = req.params;
    const user = yield User.findOne({ verificationCode });
    if (!user) {
        throw HttpError(404, 'Email not found or verification code is outdated');
    }
    yield User.findByIdAndUpdate(user._id, {
        verificationCode: '',
        verify: true,
    });
    // createResponse(res, 200, 'Email verified');
    res.send('<p>Email verification success!</p>');
});
module.exports = verifyEmail;
