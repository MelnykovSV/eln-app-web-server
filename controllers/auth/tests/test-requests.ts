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
    userName: 'test_new15345435',
    email: 'test@mail.com',
    password: 'Aa111111',
  },
  reqUserNameTaken: {
    userName: 'test',
    email: 'test_new1345345345345@mail.com',
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

const resendEmail = {
  reqGood: {
    email: 'test_resend_email@mail.com',
  },
  reqWrongEmail: {
    email: 'test_resend_email21312214@mail.com',
  },
  reqAlreadyVerified: {
    email: 'test@mail.com',
  },
};
const changeUserName = {
  reqGood: {
    userName: 'test_change_userName_1',
  },
  reqUnauthorized: {
    userName: 'test_change_userName_2',
  },
  reqUserNameTaken: {
    userName: 'test',
  },
  reqUserNameInvalid: {
    userName: 'test_change_userName_^',
  },
};

const changeEmail = {
  reqGood: {
    email: 'test_change_email_1@mail.com',
  },
  reqUnauthorized: {
    email: 'test_change_email_2@mail.com',
  },
  reqEmailTaken: {
    email: 'test@mail.com',
  },
  reqEmailInvalid: {
    email: 'test_change_email_4mail.com',
  },
};

const changePassword = {
  reqGood: {
    password: 'Aa222222',
  },
  reqUnauthorized: {
    password: 'Aa333333',
  },
  reqPasswordInvalid: {
    password: '55555555',
  },
};

const logoutAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2IwNmE5NDBkZTY0M2JjZjc0NTlmZCIsImlhdCI6MTY5MTAyNzExM30.PkbsM_aSJ535UsWEw8E2g6KdswibwiORcjzFBYKEa9Y';
const logoutRefreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2IwNmE5NDBkZTY0M2JjZjc0NTlmZCIsImlhdCI6MTY5MTAyNzExM30.5WeYrQKh4y-CQPNDpFG8_jWm5uDtFpHQg2hP00guFKE';
const currentAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2IwNzg4OTUyMzI4ODgzZmFiNzhhMCIsImlhdCI6MTY5MTAyNzMzNn0.RIeRIUlRnxvzfhqiluXt2zKU7V-BDKOcmp5F5xcZMsE';
const currentRefreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2IwNzg4OTUyMzI4ODgzZmFiNzhhMCIsImlhdCI6MTY5MTAyNzMzNn0.N7FY5GIpcaIljrJ9EJPKpQD4RYCdhFaAbz4iWbumqRU';

const changeAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2I5M2FhNDY4YzRkYzcwYTk4ZmQ5OSIsImlhdCI6MTY5MTA2MzMwOH0.TmDKwqtIE8swAu41w5aqQt2TK_mOSzAXVoH1egrIApk';
const changeRefreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2I5M2FhNDY4YzRkYzcwYTk4ZmQ5OSIsImlhdCI6MTY5MTA2MzMwOH0.9BgyRSKlHuJkmSfr0vC4oyk-9PDInH4pOE_qOkELAVs';

module.exports = {
  login,
  register,
  resendEmail,
  logoutAccessToken,
  logoutRefreshToken,
  currentAccessToken,
  currentRefreshToken,
  changeUserName,
  changeEmail,
  changePassword,
  changeAccessToken,
  changeRefreshToken,
};
export {};
