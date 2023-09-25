"use strict";
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_ACCESS_KEY, SECRET_REFRESH_KEY } = process.env;
const generateTokens = (id) => {
    const payload = {
        id,
    };
    const accessToken = jwt.sign(payload, SECRET_ACCESS_KEY);
    const refreshToken = jwt.sign(payload, SECRET_REFRESH_KEY);
    return { accessToken, refreshToken };
};
const validateAccessToken = (token) => {
    const result = jwt.verify(token, SECRET_ACCESS_KEY);
    return result;
};
const validateRefreshToken = (token) => {
    const result = jwt.verify(token, SECRET_REFRESH_KEY);
    return result;
};
module.exports = { generateTokens, validateAccessToken, validateRefreshToken };
