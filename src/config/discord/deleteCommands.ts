import { REST, Routes } from 'discord.js';
import 'dotenv/config';

const { CLIENT_ID, DISCORD_TOKEN } = process.env;

if (!CLIENT_ID || !DISCORD_TOKEN) {
  throw new Error('No client ID or token provided.');
}

const rest = new REST().setToken(DISCORD_TOKEN);

rest
  .put(Routes.applicationCommands(CLIENT_ID), { body: [] })
  .then(() => console.log('Successfully deleted all application commands.'))
  .catch(console.error);
