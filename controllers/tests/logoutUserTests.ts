const request = require('supertest');
const app = require('./../../app');

const { logoutAccessToken } = require('./test-requests');

const logoutTests = () => {
  test('Should have status-code 200', async () => {
    const response = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${logoutAccessToken}`)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Logout success');
  });
  test('Should have status-code 401', async () => {
    const response = await request(app).post('/api/auth/logout').send();
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });
};

module.exports = logoutTests;

export {};
