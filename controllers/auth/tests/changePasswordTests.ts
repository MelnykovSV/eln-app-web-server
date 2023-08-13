const request = require('supertest');
const app = require('../../../app');

const {
  changePassword: { reqGood, reqUnauthorized, reqPasswordInvalid },
  changeAccessToken,
} = require('./test-requests');

const changePasswordTests = () => {
  test('Should have status-code 200 and message "User password updated succesfuly"', async () => {
    const response = await request(app)
      .patch('/api/auth/password')
      .set('authorization', `Bearer ${changeAccessToken}`)
      .send(reqGood);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User password updated succesfuly');
  });
  test('Should have status-code 401 and message "Unauthorized"', async () => {
    const response = await request(app)
      .patch('/api/auth/password')
      .send(reqUnauthorized);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });
  test('Should have status-code 400 and message "Password should contain at least 1 capital letter, 1 normal letter and 1 number"', async () => {
    const response = await request(app)
      .patch('/api/auth/password')
      .set('authorization', `Bearer ${changeAccessToken}`)
      .send(reqPasswordInvalid);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'Password should contain at least 1 capital letter, 1 normal letter and 1 number'
    );
  });
};

module.exports = changePasswordTests;

export {};
