const request = require('supertest');
const app = require('./../../app');

const { accessToken } = require('./test-requests');

const logoutTests = test('login tests', async () => {
  test('Should have status-code 200', async () => {
    const response = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Logout success');
  });
  test('Should have status-code 401', async () => {
    const response = await request(app).post('/api/auth/logout').send();
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Not authorized');
  });
});

module.exports = logoutTests;

export {};
