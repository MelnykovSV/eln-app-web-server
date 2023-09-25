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
const sgMail = require('@sendgrid/mail');
const { nanoid } = require('nanoid');
require('dotenv').config();
const { SENDGRID_API_KEY, BASE_URL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
const sendVerificationEmail = (email, changeEmail = false) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationCode = nanoid();
    if (changeEmail) {
        const verifyEmail = {
            to: email,
            subject: 'Verify email',
            html: `<a target="_blank" href="${BASE_URL}/api/auth/changeEmail/${email}/${verificationCode}">Click to verify email</a>`,
        };
        const letter = Object.assign(Object.assign({}, verifyEmail), { from: 'melnykov8515@gmail.com' });
        yield sgMail.send(letter);
        return verificationCode;
    }
    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
    };
    const letter = Object.assign(Object.assign({}, verifyEmail), { from: 'melnykov8515@gmail.com' });
    yield sgMail.send(letter);
    return verificationCode;
});
module.exports = sendVerificationEmail;
