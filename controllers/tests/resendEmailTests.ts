const request = require('supertest');
const app = require('./../../app');

const {
  resendEmail: { reqGood, reqWrongEmail, reqAlreadyVerified },
} = require('./test-requests');

const resendEmailTests = () => {
  test('Should have status-code 200 and message "Verification link has been sent to you email"', async () => {
    const response = await request(app).post('/api/auth/verify').send(reqGood);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      'Verification link has been sent to you email'
    );
  });
  test('Should have status-code 404 and message "Email not found"', async () => {
    const response = await request(app)
      .post('/api/auth/verify')
      .send(reqWrongEmail);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Email not found');
  });
  test('Should have status-code 400 and message "Email is already verified"', async () => {
    const response = await request(app)
      .post('/api/auth/verify')
      .send(reqAlreadyVerified);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email is already verified');
  });
};

module.exports = resendEmailTests;

export {};
