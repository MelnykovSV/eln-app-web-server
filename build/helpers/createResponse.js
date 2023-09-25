"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createResponse = (res, code = 200, message = 'Operation successful', data = null) => {
    if (data) {
        return res.status(code).json({
            status: 'success',
            code,
            message,
            data,
        });
    }
    return res.status(code).json({
        status: 'success',
        code,
        message,
    });
};
module.exports = createResponse;
