const request = require('supertest');
const app = require('../../../app');

const {
  changeUserName: {
    reqGood,
    reqUnauthorized,
    reqUserNameTaken,
    reqUserNameInvalid,
  },
  changeAccessToken,
} = require('./test-requests');

const changeUserNameTests = () => {
  test('Should have status-code 200 and message "User name updated succesfuly"', async () => {
    const response = await request(app)
      .patch('/api/auth/userName')
      .set('authorization', `Bearer ${changeAccessToken}`)
      .send(reqGood);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User name updated succesfuly');
  });
  test('Should have status-code 401 and message "Unauthorized"', async () => {
    const response = await request(app)
      .patch('/api/auth/userName')
      .send(reqUnauthorized);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });
  test('Should have status-code 409 and message "This user name is already taken"', async () => {
    const response = await request(app)
      .patch('/api/auth/userName')
      .set('authorization', `Bearer ${changeAccessToken}`)
      .send(reqUserNameTaken);
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('This user name is already taken');
  });
  test('Should have status-code 400 and message "Username can contain only letters, numbers and underscores"', async () => {
    const response = await request(app)
      .patch('/api/auth/userName')
      .set('authorization', `Bearer ${changeAccessToken}`)
      .send(reqUserNameInvalid);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'Username can contain only letters, numbers and underscores'
    );
  });
};

module.exports = changeUserNameTests;

export {};
