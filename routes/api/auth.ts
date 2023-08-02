const express = require('express');
const authRouter = express.Router();
const {
  registerJoiSchema,
  loginJoiSchema,
  emailJoiSchema,
} = require('./../../models/auth');
const {
  validateBody,
  authenticate,
  upload,
} = require('./../../middlewares/index');

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changeUserName,
  changeUserPassword,
  changeUserEmail,
  updateAvatar,
  verifyEmail,
  resendEmail,
  confirmEmailChange,
} = require('./../../controllers/auth');

authRouter.post('/register', validateBody(registerJoiSchema), registerUser);
authRouter.post('/login', validateBody(loginJoiSchema), loginUser);
authRouter.get('/verify/:verificationCode', verifyEmail);
authRouter.get(
  '/changeEmail/:email/:verificationCode',
  confirmEmailChange
);
authRouter.post('/verify', validateBody(emailJoiSchema), resendEmail);
authRouter.post('/logout', authenticate, logoutUser);
authRouter.get('/current', authenticate, getCurrentUser);
authRouter.patch('/userName', authenticate, changeUserName);
authRouter.patch('/password', authenticate, changeUserPassword);
authRouter.patch('/email', authenticate, changeUserEmail);
authRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  updateAvatar
);

module.exports = authRouter;
export {};
