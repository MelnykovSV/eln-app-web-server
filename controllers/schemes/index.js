"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ctrlWrapper } = require('../../helpers/index');
const createNewScheme = require('./createNewScheme');
const deleteScheme = require('./deleteScheme');
const getSchemes = require('./getSchemes');
const getSingleScheme = require('./getSingleScheme');
const updateSchemeStatus = require('./updateSchemeStatus');
const updateAttempt = require('./updateAttempt');
const updateStage = require('./updateStage');
const addAttempt = require('./addAttempt');
const uploadSpectr = require('./uploadSpectr');
const downloadSpectr = require('./downloadSpectr');
module.exports = {
    createNewScheme: ctrlWrapper(createNewScheme),
    deleteScheme: ctrlWrapper(deleteScheme),
    getSchemes: ctrlWrapper(getSchemes),
    getSingleScheme: ctrlWrapper(getSingleScheme),
    updateSchemeStatus: ctrlWrapper(updateSchemeStatus),
    updateAttempt: ctrlWrapper(updateAttempt),
    updateStage: ctrlWrapper(updateStage),
    addAttempt: ctrlWrapper(addAttempt),
    uploadSpectr: ctrlWrapper(uploadSpectr),
    downloadSpectr: ctrlWrapper(downloadSpectr),
};
