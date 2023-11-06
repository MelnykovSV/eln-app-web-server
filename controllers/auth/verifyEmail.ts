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

  // res.send(
  //   `<!DOCTYPE html><html><head><title>Email Validation Success</title><link rel="stylesheet" type="text/css" href="${WEB_SERVER_DOMAIN}/css/styles.css"></head><body><h1>Email Validation Successful</h1><p>Your email has been successfully validated. You can now access our services.</p><p>Login with you new account credentials:</p><a href=${LOGIN_PAGE_URL}>Login page</a></body></html>`
  // );

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Email Validation Success</title>
        <link rel="stylesheet" type="text/css" href="${WEB_SERVER_DOMAIN}/css/styles.css" />
      </head>
      <body>
        <section class="container section">
          <div class="logo">
            <div class="icon-container">
              <img src="${WEB_SERVER_DOMAIN}/eln_logo.svg" alt="eln logo" />
            </div>
            <div class="logo_text-container">
              <span class="logo_text-line">
                <span class="logo_capital-letter">E</span>lectronic
              </span>
              <span class="logo_text-line">
                <span class="logo_capital-letter">L</span>aboratory
              </span>
              <span class="logo_text-line">
                <span class="logo_capital-letter">N</span>otebook
              </span>
            </div>
          </div>
    
          <h1 class="title">Email Validation Successful</h1>
          <p class="paragraph outer">
            Your email has been successfully validated. You can now access our services.
          </p>
          <div class="link-paragraph">
            <p class="paragraph">Login with your new account credentials:</p>
            <a class="link" href=${LOGIN_PAGE_URL}>Login page</a>
          </div>
        </section>
      </body>
    </html>
    `);
};

module.exports = verifyEmail;
