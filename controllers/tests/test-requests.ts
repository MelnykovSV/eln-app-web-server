const login = {
  reqGood: {
    email: 'test@mail.com',
    password: 'Aa111111',
  },
  reqGoodWrongPass: {
    email: 'test@mail.com',
    password: 'Aa111112',
  },
  reqUnverified: {
    email: 'test_unverified@mail.com',
    password: 'Aa111111',
  },
  reqUnverifiedWrongPass: {
    email: 'test_unverified@mail.com',
    password: 'Aa111112',
  },
  reqUndefined: undefined,
  reqEmpty: {},
  reqNoEmail: {
    password: 'Aa111111',
  },
  reqNoPassword: {
    email: 'test@mail.com',
  },
  reqInvalidEmail: {
    email: 'testmail.com',
    password: 'Aa111111',
  },
  reqInvalidPassword: {
    email: 'test@mail.com',
    password: '11111111',
  },
};
const register = {
  reqGood: {
    userName: 'test_new',
    email: 'test_new@mail.com',
    password: 'Aa111111',
  },

  reqEmailTaken: {
    userName: 'test_new1',
    email: 'test@mail.com',
    password: 'Aa111111',
  },
  reqUserNameTaken: {
    userName: 'test',
    email: 'test_new1@mail.com',
    password: 'Aa111111',
  },

  reqUndefined: undefined,
  reqEmpty: {},

  reqNoUserName: {
    email: 'test_new@mail.com',
    password: 'Aa111111',
  },
  reqNoEmail: {
    userName: 'test_new',
    password: 'Aa111111',
  },
  reqNoPassword: {
    userName: 'test_new',
    email: 'test_new@mail.com',
  },

  reqInvalidEmail: {
    userName: 'test_new',
    email: 'testmail.com',
    password: 'Aa111111',
  },
  reqInvalidPassword: {
    userName: 'test_new',
    email: 'test_new@mail.com',
    password: '11111111',
  },
  reqInvalidUserName: {
    userName: 'test_new^',
    email: 'test_new@mail.com',
    password: '11111111',
  },
};

module.exports = {
  login,
  register,
};
export {};
