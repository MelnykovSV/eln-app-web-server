const request = require('supertest');
const app = require('./../../app');

const confirmEmailChangeTests = () => {
  test('Should have status-code 200', async () => {
    const response = await request(app)
      .get(
        '/api/auth/changeEmail/test_new_email@mail.com/jyYE5xbr7E35naOM8ki3D'
      )
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Email successfuly changed');
  });
  test('Should have status-code 404', async () => {
    const response = await request(app)
      .get(
        '/api/auth/changeEmail/test_new_email1@mail.com/jyYE5xbr7E35naOM11111'
      )
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe(
      'Email not found or verification code is outdated'
    );
  });
};

module.exports = confirmEmailChangeTests;

export {};
