"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { HttpError, createResponse } = require('../../helpers/index');
const { Scheme } = require('../../models/scheme');
const addAttempt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw HttpError(401);
    }
    const response = yield Scheme.findOneAndUpdate({ 'stages._id': req.params.stageId }, {
        ///Сделать не только для первого элемента!
        $push: { [`stages.${0}.attempts`]: req.body },
    }, { new: true });
    createResponse(res, 201, 'New attempt added', response);
});
module.exports = addAttempt;
