"use strict";
const generateStageUpdateBody = (obj) => {
    const resultingObject = {};
    for (const item in obj) {
        resultingObject[`stages.$[stage].${item}`] = obj[item];
    }
    return resultingObject;
};
module.exports = generateStageUpdateBody;
