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
const { validateRefreshToken, HttpError } = require('./../helpers/index');
const { User } = require('./../models/auth');
const authenticateRefresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { refreshToken: oldRefreshToken } = req.cookies;
        // const { id } = validateRefreshToken(oldRefreshToken);
        // const user = await User.findById(id);
        // if (!user || !user.accessToken || user.refreshToken !== oldRefreshToken) {
        //   throw HttpError(401);
        // }
        // req.user = user;
        // next();
        const { authorization } = req.headers;
        if (!authorization || typeof authorization !== 'string') {
            throw HttpError(401);
        }
        const [bearer, token] = authorization.split(' ');
        console.log(token);
        if (bearer !== 'Bearer') {
            throw HttpError(401);
        }
        console.log(token);
        const { id } = validateRefreshToken(token);
        const user = yield User.findById(id);
        if (!user || !user.refreshToken || user.refreshToken !== token) {
            throw HttpError(401);
        }
        console.log(token);
        req.user = user;
        next();
    }
    catch (error) {
        next(HttpError(401));
    }
});
module.exports = authenticateRefresh;
