import * as Express from 'express';

const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');

const verifyEmail = async (req: Express.Request, res: Express.Response) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(404, 'Email not found or verification code is outdated');
  }

  await User.findByIdAndUpdate(user._id, {
    verificationCode: '',
    verify: true,
  });

  // createResponse(res, 200, 'Email verified');
  res.send(
    '<!DOCTYPE html><html><head><title>Email Validation Success</title></head><body><h1>Email Validation Successful</h1><p>Your email has been successfully validated. You can now access our services.</p><p>Here\'s a link to another page:</p><a href="https://www.example.com/another-page.html">Go to Another Page</a></body></html>'
  );
};

module.exports = verifyEmail;
