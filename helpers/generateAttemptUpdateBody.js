"use strict";
const generateAttemptUpdateBody = (obj) => {
    const resultingObject = {};
    for (const item in obj) {
        resultingObject[`stages.$[].attempts.$[attempt].${item}`] = obj[item];
    }
    return resultingObject;
};
module.exports = generateAttemptUpdateBody;
