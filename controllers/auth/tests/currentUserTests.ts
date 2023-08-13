const request = require('supertest');
const app = require('../../../app');
const { currentAccessToken } = require('./test-requests');

const currentUserTests = () => {
  test('Should have status-code 200', async () => {
    const response = await request(app)
      .get('/api/auth/current')
      .set('authorization', `Bearer ${currentAccessToken}`)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Current user');
  });
  test('Should have status-code 401', async () => {
    const response = await request(app).get('/api/auth/current').send();
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });
};

module.exports = currentUserTests;

export {};
