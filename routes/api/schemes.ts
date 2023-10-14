const express = require('express');
const schemesRouter = express.Router();

const {
  createNewScheme,
  deleteScheme,
  getSchemes,
  getSingleScheme,
  updateSchemeStatus,
  updateAttempt,
  updateStage,
  addAttempt,
  uploadSpectr,
  deleteSpectr,
  // downloadSpectr,
} = require('./../../controllers/schemes/index');
const {
  validateBody,
  authenticate,
  uploadCloud,
} = require('./../../middlewares/index');

schemesRouter.get('/', authenticate, getSchemes);

schemesRouter.get('/:schemeId', authenticate, getSingleScheme);
schemesRouter.post('/', authenticate, createNewScheme);

schemesRouter.delete('/', authenticate, deleteScheme);
schemesRouter.post('/updateAttempt/:attemptId', authenticate, updateAttempt);
schemesRouter.patch('/updateStage/:stageId', authenticate, updateStage);
schemesRouter.post('/addAttempt/:stageId', authenticate, addAttempt);

schemesRouter.patch(
  '/spectr',
  authenticate,
  uploadCloud.single('spectr'),
  uploadSpectr
);

schemesRouter.delete(
  '/spectr/:stageId/:attemptNumber/:spectrId/:publicId',
  authenticate,
  deleteSpectr
);

schemesRouter.patch('/:schemeId', authenticate, updateSchemeStatus);
module.exports = schemesRouter;
export {};
