import mongoose from 'mongoose';

import { MONGODB_URI } from '../constants/config';

export const connectDB = async () => {
  mongoose.Promise = global.Promise;

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Could not connect to the database. Exiting now...', error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit();
  }
};
