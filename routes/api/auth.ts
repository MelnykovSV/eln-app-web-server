const express = require('express');
const authRouter = express.Router();
const {
  registerJoiSchema,
  loginJoiSchema,
  emailJoiSchema,
  userNameJoiSchema,
  passwordJoiSchema,
} = require('./../../models/auth');
const {
  validateBody,
  authenticate,
  upload,
  authenticateRefresh,
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
  refresh,
} = require('./../../controllers/auth');

authRouter.post('/register', validateBody(registerJoiSchema), registerUser);
authRouter.post('/login', validateBody(loginJoiSchema), loginUser);
authRouter.get('/verify/:verificationCode', verifyEmail);
authRouter.get('/changeEmail/:email/:verificationCode', confirmEmailChange);
authRouter.post('/verify', validateBody(emailJoiSchema), resendEmail);
authRouter.post('/logout', authenticate, logoutUser);
authRouter.get('/current', authenticate, getCurrentUser);
authRouter.patch(
  '/userName',
  authenticate,
  validateBody(userNameJoiSchema),
  changeUserName
);
authRouter.patch(
  '/password',
  authenticate,
  validateBody(passwordJoiSchema),
  changeUserPassword
);
authRouter.patch(
  '/email',
  authenticate,
  validateBody(emailJoiSchema),
  changeUserEmail
);
authRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  updateAvatar
);
authRouter.post('/refresh', authenticateRefresh, refresh);
module.exports = authRouter;
export {};
