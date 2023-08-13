const request = require('supertest');
const app = require('../../../app');

const {
  changeEmail: { reqGood, reqUnauthorized, reqEmailTaken, reqEmailInvalid },
  changeAccessToken,
} = require('./test-requests');

const changeEmailTests = () => {
  test('Should have status-code 200 and message "Verification link was sent to your new email"', async () => {
    const response = await request(app)
      .patch('/api/auth/email')
      .set('authorization', `Bearer ${changeAccessToken}`)
      .send(reqGood);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      'Verification link was sent to your new email'
    );
  });
  test('Should have status-code 401 and message "Unauthorized"', async () => {
    const response = await request(app)
      .patch('/api/auth/email')
      .send(reqUnauthorized);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });
  test('Should have status-code 409 and message "This email is already taken"', async () => {
    const response = await request(app)
      .patch('/api/auth/email')
      .set('authorization', `Bearer ${changeAccessToken}`)
      .send(reqEmailTaken);
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('This email is already taken');
  });
  test('Should have status-code 400 and message "Invalid email"', async () => {
    const response = await request(app)
      .patch('/api/auth/email')
      .set('authorization', `Bearer ${changeAccessToken}`)
      .send(reqEmailInvalid);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid email');
  });
};

module.exports = changeEmailTests;

export {};
