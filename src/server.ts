import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { PORT } from './constants/config';
import { connectDB, connectRouter } from './utils';

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: '*',
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
  }),
);
app.use(bodyParser.json());

connectDB();
connectRouter(app);

app.listen(PORT);

export default app;
