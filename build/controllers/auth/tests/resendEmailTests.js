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
const { resendEmail: { reqGood, reqWrongEmail, reqAlreadyVerified }, } = require('./test-requests');
const resendEmailTests = () => {
    test('Should have status-code 200 and message "Verification link has been sent to you email"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).post('/api/auth/verify').send(reqGood);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Verification link has been sent to you email');
    }));
    test('Should have status-code 404 and message "Email not found"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/verify')
            .send(reqWrongEmail);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Email not found');
    }));
    test('Should have status-code 400 and message "Email is already verified"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/verify')
            .send(reqAlreadyVerified);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Email is already verified');
    }));
};
module.exports = resendEmailTests;
