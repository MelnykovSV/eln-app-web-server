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
const { register: { reqGood, reqEmailTaken, reqUserNameTaken, reqUndefined, reqEmpty, reqNoUserName, reqNoEmail, reqNoPassword, reqInvalidEmail, reqInvalidPassword, reqInvalidUserName, }, } = require('./test-requests');
const registerTests = () => {
    test('Should have status-code 201, accessToken as string and contain exactly 3 fields in user: userName, email and avatarURL', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/register')
            .send(reqGood);
        expect(response.statusCode).toBe(201);
        expect(response.body.data.user.userName).toBe('test_new');
        expect(response.body.data.user.email).toBe('test_new@mail.com');
        expect(response.body.data.user.avatarURL).toBe('');
        expect(Object.keys(response.body.data.user).length).toBe(3);
    }));
    test('Should have status-code 409 and have message "Email already in use"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/register')
            .send(reqEmailTaken);
        expect(response.statusCode).toBe(409);
        expect(response.body.message).toBe('Email already in use');
    }));
    test('Should have status-code 409 and have message "User name already in use"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/register')
            .send(reqUserNameTaken);
        expect(response.statusCode).toBe(409);
        expect(response.body.message).toBe('User name already in use');
    }));
    test('Should have status-code 409 and have message "User name already in use"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/register')
            .send(reqUndefined);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Missing fields');
    }));
    test('Should have status-code 400 and message "Missing fields" (empty request body)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/register')
            .send(reqEmpty);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Missing fields');
    }));
    test('Should have status-code 400 and message ""userName" is required" (no user name)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/register')
            .send(reqNoUserName);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('"userName" is required');
    }));
    test('Should have status-code 400 and message ""userName" is required" (no user name)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/register')
            .send(reqNoEmail);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('"email" is required');
    }));
    test('Should have status-code 400 and message ""userName" is required" (no user name)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/register')
            .send(reqNoPassword);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('"password" is required');
    }));
    test('Should have status-code 400 and message "Invalid email" (invalid email)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/register')
            .send(reqInvalidEmail);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid email');
    }));
    test('Should have status-code 400 and message "Username can contain only letters, numbers and underscores" (invalid userName)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/register')
            .send(reqInvalidUserName);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Username can contain only letters, numbers and underscores');
    }));
    test('Should have status-code 400 and message "Password should contain at least 1 capital letter, 1 normal letter and 1 number" (invalid userName)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/auth/register')
            .send(reqInvalidPassword);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Password should contain at least 1 capital letter, 1 normal letter and 1 number');
    }));
};
module.exports = registerTests;
