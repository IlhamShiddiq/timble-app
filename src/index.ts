import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import sequelize from './configs/db.config';
import configs from './configs/general.config'

import authRouter from './routes/auth.route';
import generalRouter from './routes/general.route';
import userRouter from './routes/user.route';

sequelize.authenticate().then(() => console.log('db connected'))

const app: Express = express();
const port: number = configs.app.port

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', generalRouter)
app.use('/auth', authRouter)
app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});