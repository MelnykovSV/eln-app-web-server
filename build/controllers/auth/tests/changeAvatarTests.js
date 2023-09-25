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
// const fs = require('fs/promises');
const fs = require('fs');
const { changeAccessToken } = require('./test-requests');
const changeAvatarTests = () => {
    test('Should have status-code 200 and message "User avatar updated"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .patch('/api/auth/avatar')
            .set('authorization', `Bearer ${changeAccessToken}`)
            .attach('avatar', fs.readFileSync(`${__dirname}/tree.jpg`), 'tests/tree.jpg');
        // TODO: РАЗОБРАТЬ ЭТУ ЗАПИСЬ!!!
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User avatar updated');
    }));
    test('Should have status-code 401 and message "Unauthorized"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .patch('/api/auth/avatar')
            .attach('avatar', fs.readFileSync(`${__dirname}/tree.jpg`), 'tests/tree.jpg');
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    }));
    test('Should have status-code 400 and message "Image is required"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .patch('/api/auth/avatar')
            .set('authorization', `Bearer ${changeAccessToken}`);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Image is required');
    }));
    test('Should have status-code 400 and message "Image has to be in .png or .jpg fromat"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .patch('/api/auth/avatar')
            .set('authorization', `Bearer ${changeAccessToken}`)
            .attach('avatar', fs.readFileSync(`${__dirname}/book.pdf`), 'tests/book.pdf');
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Image has to be in .png or .jpg fromat');
    }));
};
module.exports = changeAvatarTests;
