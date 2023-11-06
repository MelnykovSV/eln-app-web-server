import * as Express from 'express';

const { HttpError, createResponse } = require('../../helpers/index');
const { User } = require('../../models/auth');
const { LOGIN_PAGE_URL, WEB_SERVER_DOMAIN } = require('./../../constants');

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

  res.send(
    `<!DOCTYPE html><html><head><title>Email Validation Success</title><link rel="stylesheet" type="text/css" href="${WEB_SERVER_DOMAIN}/css/styles.css"></head><body><h1>Email Validation Successful</h1><p>Your email has been successfully validated. You can now access our services.</p><p>Here\'s a link to another page:</p><a href=${LOGIN_PAGE_URL}>Login page</a></body></html>`
  );
};

module.exports = verifyEmail;
