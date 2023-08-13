const express = require('express');
const schemesRouter = express.Router();

const {
  createNewScheme,
  deleteScheme,
  getSchemes,
  getSingleScheme,
  updateScheme,
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

module.exports = schemesRouter;
export {};
