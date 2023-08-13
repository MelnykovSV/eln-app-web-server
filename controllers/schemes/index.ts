const { ctrlWrapper } = require('../../helpers/index');

const createNewScheme = require('./createNewScheme');
const deleteScheme = require('./deleteScheme');
const getSchemes = require('./getSchemes');
const getSingleScheme = require('./getSingleScheme');
const updateScheme = require('./updateScheme');

module.exports = {
  createNewScheme: ctrlWrapper(createNewScheme),
  deleteScheme: ctrlWrapper(deleteScheme),
  getSchemes: ctrlWrapper(getSchemes),
  getSingleScheme: ctrlWrapper(getSingleScheme),
  updateScheme: ctrlWrapper(updateScheme),
};

export {};
