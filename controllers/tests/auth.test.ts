const mongoDB = require('./../../server');
const registerTests = require('./registerUserTests');
const loginTests = require('./loginUserTests');
const logoutTests = require('./logoutUserTests');
const currentUserTests = require('./currentUserTests');
const verifyEmailTests = require('./verifyEmailTests');
const confirmEmailChangeTests = require('./confirmEmailChangeTests');
const resendEmailTests = require('./resendEmailTests');

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
  verifyEmailTests();
  confirmEmailChangeTests();
  resendEmailTests();
});

export {};
