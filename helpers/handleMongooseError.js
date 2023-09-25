"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseError = (error, _data, next) => {
    error.status = 400;
    next();
};
module.exports = handleMongooseError;
