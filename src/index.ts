import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

import generalRouter from './routes/general.route';

dotenv.config();

const app: Express = express();
const port: string = process.env.APP_PORT || '3000';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', generalRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});