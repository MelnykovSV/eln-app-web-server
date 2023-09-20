const { ctrlWrapper } = require('../../helpers/index');

const createNewScheme = require('./createNewScheme');
const deleteScheme = require('./deleteScheme');
const getSchemes = require('./getSchemes');
const getSingleScheme = require('./getSingleScheme');
const updateScheme = require('./updateScheme');
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
  updateScheme: ctrlWrapper(updateScheme),
  updateAttempt: ctrlWrapper(updateAttempt),
  updateStage: ctrlWrapper(updateStage),
  addAttempt: ctrlWrapper(addAttempt),
  uploadSpectr: ctrlWrapper(uploadSpectr),
  downloadSpectr: ctrlWrapper(downloadSpectr),
};

export {};
