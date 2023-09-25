"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers/index');
const Joi = require('joi');
const { userNameRegexp, passwordRegexp, emailRegexp, } = require('./../regexp/index');
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        match: userNameRegexp,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        match: emailRegexp,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        default: '',
    },
    refreshToken: {
        type: String,
        default: '',
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        default: '',
    },
    avatarURL: {
        type: String,
        default: '',
    },
}, { versionKey: false, timestamps: true });
const registerJoiSchema = Joi.object({
    userName: Joi.string()
        .pattern(userNameRegexp, 'Username can contain only letters, numbers and underscores')
        .required(),
    email: Joi.string().pattern(emailRegexp, 'Invalid email').required(),
    password: Joi.string()
        .pattern(passwordRegexp, 'Password should contain at least 1 capital letter, 1 normal letter and 1 number')
        .required().messages({}),
});
const loginJoiSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});
const userNameJoiSchema = Joi.object({
    userName: Joi.string()
        .pattern(userNameRegexp, 'Username can contain only letters, numbers and underscores')
        .required(),
});
const emailJoiSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp, 'Invalid email').required(),
});
const passwordJoiSchema = Joi.object({
    password: Joi.string()
        .pattern(passwordRegexp, 'Password should contain at least 1 capital letter, 1 normal letter and 1 number')
        .required(),
});
userSchema.post('save', handleMongooseError);
const User = model('user', userSchema);
module.exports = {
    User,
    registerJoiSchema,
    loginJoiSchema,
    // updateUserJoiSchema,
    userNameJoiSchema,
    passwordJoiSchema,
    emailJoiSchema,
};
