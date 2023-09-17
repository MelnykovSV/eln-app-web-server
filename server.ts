import { IError } from './types';
const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const https = require('https');
require('dotenv').config();

const { DB_HOST } = process.env;
mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(3000, () => {
      console.log(__dirname);
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch((error: IError) => {
    console.log(error.message);
    process.exit(1);
  });

module.exports = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(DB_HOST);
  },
  disconnect: (done: string) => {
    mongoose.disconnect(done);
  },
};
