const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

module.exports = async () => {
  mongoose.Promise = global.Promise;

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Could not connect to the database. Exiting now...', err);
    process.exit();
  }
};
