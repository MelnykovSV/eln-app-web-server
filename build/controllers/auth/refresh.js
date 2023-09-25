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
const { generateTokens, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { accessToken, refreshToken } = generateTokens(_id);
    yield User.findByIdAndUpdate(_id, { accessToken, refreshToken });
    // res.cookie('refreshToken', refreshToken, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    // });
    const data = {
        accessToken,
        refreshToken,
    };
    createResponse(res, 200, 'Tokens refreshed', data);
});
module.exports = refresh;
