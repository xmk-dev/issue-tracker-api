import mongoose from 'mongoose';
import { MONGODB_URI } from '../constants/config';

export const connectDB = async () => {
  mongoose.Promise = global.Promise;

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    mongoose.set('debug', true);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Could not connect to the database. Exiting now...', err);
    process.exit();
  }
};
