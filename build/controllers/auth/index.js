"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ctrlWrapper } = require('../../helpers/index');
const registerUser = require('./registerUser');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const getCurrentUser = require('./getCurrentUser');
const updateAvatar = require('./updateAvatar');
const changeUserName = require('./changeUserName');
const changeUserEmail = require('./changeUserEmail');
const changeUserPassword = require('./changeUserPassword');
const verifyEmail = require('./verifyEmail');
const confirmEmailChange = require('./confirmEmailChange');
const resendEmail = require('./resendEmail');
const refresh = require('./refresh');
module.exports = {
    registerUser: ctrlWrapper(registerUser),
    loginUser: ctrlWrapper(loginUser),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendEmail: ctrlWrapper(resendEmail),
    logoutUser: ctrlWrapper(logoutUser),
    getCurrentUser: ctrlWrapper(getCurrentUser),
    changeUserName: ctrlWrapper(changeUserName),
    changeUserEmail: ctrlWrapper(changeUserEmail),
    changeUserPassword: ctrlWrapper(changeUserPassword),
    updateAvatar: ctrlWrapper(updateAvatar),
    confirmEmailChange: ctrlWrapper(confirmEmailChange),
    refresh: ctrlWrapper(refresh),
};
