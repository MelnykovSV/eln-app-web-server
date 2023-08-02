const request = require('supertest');
const app = require('./../../app');
const mongoDB = require('./../../server');

const loginTests = require('./loginUserTests');
const registerTests = require('./registerUserTests');

describe('', () => {
  beforeAll(() => {
    mongoDB.connect();
  });
  afterAll(() => {
    mongoDB.disconnect();
  });
  loginTests;
  registerTests;
});

export {};
