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
const { login: { reqGood, reqGoodWrongPass, reqUnverified, reqUnverifiedWrongPass, reqUndefined, reqEmpty, reqNoEmail, reqNoPassword, reqInvalidEmail, reqInvalidPassword, }, } = require('./test-requests');
const loginTests = () => {
    test('Should have status-code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).post('/api/auth/login').send(reqGood);
        expect(response.statusCode).toBe(200);
    }));
    test('Should have accessToken as string', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).post('/api/auth/login').send(reqGood);
        expect(typeof response.body.data.accessToken).toBe('string');
    }));
    test('Should contain exactly 3 fields in user: userName, email and avatarURL', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).post('/api/auth/login').send(reqGood);
        expect(response.body.data.user.userName).toBe('test');
        expect(response.body.data.user.email).toBe('test@mail.com');
        expect(response.body.data.user.avatarURL).toBe('');
        expect(Object.keys(response.body.data.user).length).toBe(3);
    }));
    test('Should have status-code 401 and message "Email or password invalid" (wrong password) ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/login')
            .send(reqGoodWrongPass);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Email or password invalid');
    }));
    test('Should have status-code 401 and message "Email is not verified" (not verified)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/login')
            .send(reqUnverified);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Email is not verified');
    }));
    test('Should have status-code 401 and message "Email is not verified" (not verified, wrong password)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/login')
            .send(reqUnverifiedWrongPass);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Email is not verified');
    }));
    test('Should have status-code 400 and message "Missing fields" (no request body)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/login')
            .send(reqUndefined);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Missing fields');
    }));
    test('Should have status-code 400 and message "Missing fields" (empty request body)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).post('/api/auth/login').send(reqEmpty);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Missing fields');
    }));
    test('Should have status-code 400 and message ""email" is required" (no email)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/login')
            .send(reqNoEmail);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('"email" is required');
    }));
    test('Should have status-code 400 and message ""password" is required" (no password)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/login')
            .send(reqNoPassword);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('"password" is required');
    }));
    test('Should have status-code 401 and message "Email or password invalid" (invalid email)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/login')
            .send(reqInvalidEmail);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Email or password invalid');
    }));
    test('Should have status-code 401 and message "Email or password invalid" (invalid password)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/login')
            .send(reqInvalidPassword);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Email or password invalid');
    }));
};
module.exports = loginTests;
