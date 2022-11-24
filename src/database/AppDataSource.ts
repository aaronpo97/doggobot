import { DataSource } from 'typeorm';
import DiscordGuild from './model/DiscordGuild';

const { DEV_DB_CONNECTION_STRING, PROD_DB_CONNECTION_STRING } = process.env;

if (!DEV_DB_CONNECTION_STRING || !PROD_DB_CONNECTION_STRING) {
  throw new Error('Missing database connection string');
}

const inProduction = process.env.NODE_ENV === 'production';

const DevDataSource = new DataSource({
  type: 'postgres',
  url: DEV_DB_CONNECTION_STRING,
  entities: [DiscordGuild],
  synchronize: true,
  dropSchema: true,
});

const ProdDataSource = new DataSource({
  type: 'postgres',
  url: PROD_DB_CONNECTION_STRING,
  entities: [DiscordGuild],
});

const AppDataSource = inProduction ? ProdDataSource : DevDataSource;

export default AppDataSource;
