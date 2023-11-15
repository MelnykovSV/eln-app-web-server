const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_ACCESS_KEY, SECRET_REFRESH_KEY } = process.env;

const generateTokens = (id: string) => {
  const payload = {
    id,
  };
  const accessToken = jwt.sign(payload, SECRET_ACCESS_KEY, {
    expiresIn: '1min',
  });
  const refreshToken = jwt.sign(payload, SECRET_REFRESH_KEY, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
};

const validateAccessToken = (token: string) => {
  const result = jwt.verify(token, SECRET_ACCESS_KEY);
  return result;
};

const validateRefreshToken = (token: string) => {
  const result = jwt.verify(token, SECRET_REFRESH_KEY);
  return result;
};

module.exports = { generateTokens, validateAccessToken, validateRefreshToken };
