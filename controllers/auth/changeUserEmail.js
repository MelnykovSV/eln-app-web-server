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
const { HttpError, sendVerificationEmail, createResponse, } = require('../../helpers/index');
const { User, emailJoiSchema } = require('../../models/auth');
const changeUserEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const user = yield User.findById(_id);
    if (!user) {
        throw HttpError(401);
    }
    const { email: newEmail } = req.body;
    const isEmailTaken = yield User.findOne({ email: newEmail });
    if (isEmailTaken) {
        throw HttpError(409, 'This email is already taken');
    }
    const { error } = emailJoiSchema.validate({ email: newEmail });
    if (error) {
        throw HttpError(400, 'Invalid user name');
    }
    const verificationCode = yield sendVerificationEmail(newEmail, true);
    yield User.findByIdAndUpdate(_id, {
        verificationCode,
    }, { new: true });
    createResponse(res, 200, 'Verification link was sent to your new email');
});
module.exports = changeUserEmail;
