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
const confirmEmailChangeTests = () => {
    test('Should have status-code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .get('/api/auth/changeEmail/test_new_email@mail.com/jyYE5xbr7E35naOM8ki3D')
            .send();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Email successfuly changed');
    }));
    test('Should have status-code 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .get('/api/auth/changeEmail/test_new_email1@mail.com/jyYE5xbr7E35naOM11111')
            .send();
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Email not found or verification code is outdated');
    }));
};
module.exports = confirmEmailChangeTests;
