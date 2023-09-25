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
const { changeEmail: { reqGood, reqUnauthorized, reqEmailTaken, reqEmailInvalid }, changeAccessToken, } = require('./test-requests');
const changeEmailTests = () => {
    test('Should have status-code 200 and message "Verification link was sent to your new email"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .patch('/api/auth/email')
            .set('authorization', `Bearer ${changeAccessToken}`)
            .send(reqGood);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Verification link was sent to your new email');
    }));
    test('Should have status-code 401 and message "Unauthorized"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .patch('/api/auth/email')
            .send(reqUnauthorized);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    }));
    test('Should have status-code 409 and message "This email is already taken"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .patch('/api/auth/email')
            .set('authorization', `Bearer ${changeAccessToken}`)
            .send(reqEmailTaken);
        expect(response.statusCode).toBe(409);
        expect(response.body.message).toBe('This email is already taken');
    }));
    test('Should have status-code 400 and message "Invalid email"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .patch('/api/auth/email')
            .set('authorization', `Bearer ${changeAccessToken}`)
            .send(reqEmailInvalid);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid email');
    }));
};
module.exports = changeEmailTests;
