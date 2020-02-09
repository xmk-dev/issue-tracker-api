const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { PORT, CORS } = require('./config');
const connectDB = require('./db');
const connectRouter = require('./routes/router');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: CORS.origins,
  methods: CORS.methods,
}));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB();
connectRouter(app);

app.listen(PORT);

module.exports = app;
