import dotenv from "dotenv";
dotenv.config();

const configs = {
  app: {
    port: +(process.env.APP_PORT || '3000')
  },
  db: {
    database: process.env.DB_NAME || 'timble-app',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || '5432'),
  }
}

export default configs;