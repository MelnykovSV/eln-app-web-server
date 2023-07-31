const userNameRegexp = /^[a-zA-Z0-9_]{3,30}$/;

const passwordRegexp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
const emailRegexp =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
  userNameRegexp,
  passwordRegexp,
  emailRegexp,
};

export {};
