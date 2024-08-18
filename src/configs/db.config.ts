import configs from './general.config';
import { Sequelize } from 'sequelize';

const { database, username, password, host, port } = configs.db
const sequelize: Sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: 'postgres',
});

export default sequelize;
