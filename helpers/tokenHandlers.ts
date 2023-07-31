const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;
console.log(SECRET_KEY);

const generateToken = (id: string) => {
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  return token;
};

const validateToken = (token: string) => {
  const result = jwt.verify(token, SECRET_KEY);
  return result;
};

module.exports = { generateToken, validateToken };
