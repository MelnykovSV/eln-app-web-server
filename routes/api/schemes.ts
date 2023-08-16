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
} = require('./../../controllers/schemes/index');
const {
  validateBody,
  authenticate,
  upload,
} = require('./../../middlewares/index');

schemesRouter.get('/', authenticate, getSchemes);
schemesRouter.get('/:schemeId', authenticate, getSingleScheme);
schemesRouter.post('/', authenticate, createNewScheme);
schemesRouter.put('/', authenticate, updateScheme);
schemesRouter.delete('/', authenticate, deleteScheme);
schemesRouter.post('/updateAttempt/:attemptId', authenticate, updateAttempt);
schemesRouter.post('/updateStage/:stageId', authenticate, updateStage);
schemesRouter.post('/addAttempt/:stageId', authenticate, addAttempt);

module.exports = schemesRouter;
export {};
