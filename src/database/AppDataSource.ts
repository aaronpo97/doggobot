import { DataSource } from 'typeorm';
import DiscordGuild from './model/DiscordGuild';

const { LOCAL_DB_CONNECTION_STRING: DB_CONNECTION_STRING } = process.env;

const AppDataSource = new DataSource({
  type: 'postgres',
  url: DB_CONNECTION_STRING,
  entities: [DiscordGuild],
  synchronize: true,
});

export default AppDataSource;
