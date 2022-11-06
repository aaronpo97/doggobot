import { DataSource } from 'typeorm';
import DiscordGuild from './model/DiscordGuild';

const { LOCAL_DB_CONNECTION_STRING } = process.env;

const AppDataSource = new DataSource({
  type: 'postgres',
  url: LOCAL_DB_CONNECTION_STRING,
  synchronize: true,
  entities: [DiscordGuild],
});

export default AppDataSource;
