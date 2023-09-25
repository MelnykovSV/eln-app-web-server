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
const request = require('supertest');
const app = require('../../../app');
const { changeUserName: { reqGood, reqUnauthorized, reqUserNameTaken, reqUserNameInvalid, }, changeAccessToken, } = require('./test-requests');
const changeUserNameTests = () => {
    test('Should have status-code 200 and message "User name updated succesfuly"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .patch('/api/auth/userName')
            .set('authorization', `Bearer ${changeAccessToken}`)
            .send(reqGood);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User name updated succesfuly');
    }));
    test('Should have status-code 401 and message "Unauthorized"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .patch('/api/auth/userName')
            .send(reqUnauthorized);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    }));
    test('Should have status-code 409 and message "This user name is already taken"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .patch('/api/auth/userName')
            .set('authorization', `Bearer ${changeAccessToken}`)
            .send(reqUserNameTaken);
        expect(response.statusCode).toBe(409);
        expect(response.body.message).toBe('This user name is already taken');
    }));
    test('Should have status-code 400 and message "Username can contain only letters, numbers and underscores"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .patch('/api/auth/userName')
            .set('authorization', `Bearer ${changeAccessToken}`)
            .send(reqUserNameInvalid);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Username can contain only letters, numbers and underscores');
    }));
};
module.exports = changeUserNameTests;
