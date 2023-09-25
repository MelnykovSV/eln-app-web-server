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
const { currentAccessToken } = require('./test-requests');
const currentUserTests = () => {
    test('Should have status-code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .get('/api/auth/current')
            .set('authorization', `Bearer ${currentAccessToken}`)
            .send();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Current user');
    }));
    test('Should have status-code 401', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get('/api/auth/current').send();
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    }));
};
module.exports = currentUserTests;
