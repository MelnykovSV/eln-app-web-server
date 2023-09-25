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
const path = require('path');
const { createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    yield User.findByIdAndUpdate(_id, {
        accessToken: '',
        refreshToken: '',
    });
    createResponse(res, 200, 'Logout success');
});
module.exports = logoutUser;
