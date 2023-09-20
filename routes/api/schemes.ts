const express = require('express');
const schemesRouter = express.Router();

const {
  createNewScheme,
  deleteScheme,
  getSchemes,
  getSingleScheme,
  updateScheme,
  updateAttempt,
  updateStage,
  addAttempt,
  uploadSpectr,
  downloadSpectr,
} = require('./../../controllers/schemes/index');
const {
  validateBody,
  authenticate,
  upload,
} = require('./../../middlewares/index');

schemesRouter.get('/', authenticate, getSchemes);
schemesRouter.get('/spectr', authenticate, downloadSpectr);
schemesRouter.get('/:schemeId', authenticate, getSingleScheme);
schemesRouter.post('/', authenticate, createNewScheme);
schemesRouter.put('/', authenticate, updateScheme);
schemesRouter.delete('/', authenticate, deleteScheme);
schemesRouter.post('/updateAttempt/:attemptId', authenticate, updateAttempt);
schemesRouter.post('/updateStage/:stageId', authenticate, updateStage);
schemesRouter.post('/addAttempt/:stageId', authenticate, addAttempt);

schemesRouter.patch(
  '/spectr',
  authenticate,
  upload.single('spectr'),
  uploadSpectr
);

module.exports = schemesRouter;
export {};
