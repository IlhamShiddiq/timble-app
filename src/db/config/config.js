/* eslint-disable */

require('ts-node/register');
const configs = require('../../configs/general.config');

const { database, username, password, host, port } = configs.default.db
module.exports = {
  development: {
    username: username,
    password: password,
    database: database,
    host: host,
    port: port,
    dialect: 'postgres',
  },
  test: {
    username: '-',
    password: '-',
    database: '-',
    host: '-',
    port: '-',
    dialect: '-',
  },
  production: {
    username: username,
    password: password,
    database: database,
    host: host,
    port: port,
    dialect: 'postgres',
  }
};