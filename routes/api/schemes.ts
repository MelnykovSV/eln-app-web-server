const express = require('express');
const schemesRouter = express.Router();
import * as Express from 'express';

schemesRouter.get('/', (req: Express.Request, res: Express.Response) => {
  console.log('scheme route works');
  res.status(200).json({
    message: 'scheme route works',
  });
});

module.exports = schemesRouter;
export {};
