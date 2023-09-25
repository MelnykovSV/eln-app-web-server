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
const { validateAccessToken, HttpError } = require('./../helpers/index');
const { User } = require('./../models/auth');
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization || typeof authorization !== 'string') {
            throw HttpError(401);
        }
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer') {
            throw HttpError(401);
        }
        const { id } = validateAccessToken(token);
        const user = yield User.findById(id);
        if (!user || !user.accessToken || user.accessToken !== token) {
            throw HttpError(401);
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(HttpError(401));
    }
});
module.exports = authenticate;
