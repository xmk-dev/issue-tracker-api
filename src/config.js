const PORT = process.env.PORT || 9999;

const CORS = {
  origins: '*',
  methods: ['POST', 'PUT', 'GET', 'DELETE'],
};

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ds163016.mlab.com:63016/heroku_k7bh3k1h`;

module.exports = {
  PORT,
  CORS,
  MONGODB_URI,
};
