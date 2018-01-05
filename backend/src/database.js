import mongoose from 'mongoose';

const database = () =>
  new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/graphql-blog');

    const db = mongoose.connection;
    db.on('error', () => {
      reject(new Error('---FAILED to connect to mongoose'));
    });
    db.once('open', () => {
      resolve('+++Connected to mongoose');
    });
  });

export default database;
