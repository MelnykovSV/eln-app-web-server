const request = require('supertest');
const app = require('../../../app');

// const { logoutAccessToken } = require('./test-requests');

const verifyEmailTests = () => {
  test('Should have status-code 200 and message "Email verified"', async () => {
    const response = await request(app)
      .get('/api/auth/verify/ayoq6uiOTMwPEG4sO12RG')
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Email verified');
  });
  test('Should have status-code 404 and message "Email not found or verification code is outdated"', async () => {
    const response = await request(app)
      .get('/api/auth/verify/ayoq6uiOTMwPEG4s11111')
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe(
      'Email not found or verification code is outdated'
    );
  });
};

module.exports = verifyEmailTests;

export {};
