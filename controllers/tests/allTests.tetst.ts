const mongoDB = require('./../../server');
const registerTests = require('./registerUserTests');
const loginTests = require('./loginUserTests');
const logoutTests = require('./logoutUserTests');
const currentUserTests = require('./currentUserTests');

describe('', () => {
  beforeAll(() => {
    mongoDB.connect();
  });
  afterAll(() => {
    mongoDB.disconnect();
  });
  registerTests();
  loginTests();
  logoutTests();
  currentUserTests();
});

export {};
