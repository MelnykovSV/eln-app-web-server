"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { HttpError } = require('../helpers/index');
const validateBody = (schema) => {
    const func = (req, res, next) => {
        var _a, _b, _c;
        if (!Object.keys(req.body).length || !req.body) {
            next(HttpError(400, 'Missing fields'));
        }
        const { error } = schema.validate(req.body);
        if (error) {
            if ((error === null || error === void 0 ? void 0 : error.details[0].type) === 'string.pattern.name') {
                if (((_a = error === null || error === void 0 ? void 0 : error.details[0].context) === null || _a === void 0 ? void 0 : _a.label) === 'password') {
                    next(HttpError(400, 'Password should contain at least 1 capital letter, 1 normal letter and 1 number'));
                }
                if (((_b = error === null || error === void 0 ? void 0 : error.details[0].context) === null || _b === void 0 ? void 0 : _b.label) === 'userName') {
                    next(HttpError(400, 'Username can contain only letters, numbers and underscores'));
                }
                if (((_c = error === null || error === void 0 ? void 0 : error.details[0].context) === null || _c === void 0 ? void 0 : _c.label) === 'email') {
                    next(HttpError(400, 'Invalid email'));
                }
            }
            next(HttpError(400, error.message));
        }
        next();
    };
    return func;
};
module.exports = validateBody;
