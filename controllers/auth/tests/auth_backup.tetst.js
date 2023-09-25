"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDB = require('./../../server');
const registerTests = require('./registerUserTests');
const loginTests = require('./loginUserTests');
const logoutTests = require('./logoutUserTests');
const currentUserTests = require('./currentUserTests');
const verifyEmailTests = require('./verifyEmailTests');
const confirmEmailChangeTests = require('./confirmEmailChangeTests');
const resendEmailTests = require('./resendEmailTests');
const changeUserNameTests = require('./changeUserNameTests');
const changeEmailTests = require('./changeEmailTests');
const changePasswordTests = require('./changePasswordTests');
describe('', () => {
    beforeAll(() => {
        mongoDB.connect();
    });
    afterAll(() => {
        mongoDB.disconnect();
    });
    registerTests();
    loginTests();
    logoutTests();
    currentUserTests();
    verifyEmailTests();
    confirmEmailChangeTests();
    resendEmailTests();
    changeUserNameTests();
    changeEmailTests();
    changePasswordTests();
});
