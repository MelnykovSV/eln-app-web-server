const request = require('supertest');
const app = require('./../../app');
const mongoDB = require('./../../server');

const loginTests = require('./loginUserTests');
const registerTests = require('./registerUserTests');
const logoutTests = require('./logoutUserTests');
const currentUserTests = require('./currentUserTests');

describe('', () => {
  beforeAll(() => {
    mongoDB.connect();
  });
  afterAll(() => {
    mongoDB.disconnect();
  });
  loginTests;
  registerTests;
  logoutTests;
  currentUserTests;
});

export {};
