"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const schemesRouter = express.Router();
const { createNewScheme, deleteScheme, getSchemes, getSingleScheme, updateSchemeStatus, updateAttempt, updateStage, addAttempt, uploadSpectr, downloadSpectr, } = require('./../../controllers/schemes/index');
const { validateBody, authenticate, upload, } = require('./../../middlewares/index');
schemesRouter.get('/', authenticate, getSchemes);
schemesRouter.get('/:schemeId', authenticate, getSingleScheme);
schemesRouter.post('/', authenticate, createNewScheme);
schemesRouter.delete('/', authenticate, deleteScheme);
schemesRouter.post('/updateAttempt/:attemptId', authenticate, updateAttempt);
schemesRouter.patch('/updateStage/:stageId', authenticate, updateStage);
schemesRouter.post('/addAttempt/:stageId', authenticate, addAttempt);
schemesRouter.patch('/spectr', authenticate, upload.single('spectr'), uploadSpectr);
schemesRouter.get('/spectr/:schemeId/:stageId/:attemptNumber/:spectrId', authenticate, downloadSpectr);
schemesRouter.patch('/:schemeId', authenticate, updateSchemeStatus);
module.exports = schemesRouter;
