import * as Express from 'express';
const createResponse = (
  res: Express.Response,
  code: number = 200,
  message: string = 'Operation successful',
  data: any = null
) => {
  if (data) {
    return res.status(code).json({
      status: 'success',
      code,
      message,
      data,
    });
  }
  return res.status(code).json({
    status: 'success',
    code,
    message,
  });
};

module.exports = createResponse;
