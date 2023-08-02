const request = require('supertest');
const app = require('./../../app');
const mongoDB = require('./../../server');

describe('', () => {
  beforeAll(() => {
    mongoDB.connect();
  });
  afterAll(() => {
    mongoDB.disconnect();
  });
});

export {};
