/* eslint-disable import/no-extraneous-dependencies */

import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import getInfo from '../../commands/getInfo';
import ping from '../../commands/ping';
import pupper from '../../commands/pupper';
import registerGuild from '../../commands/registerGuild';
import unregisterGuild from '../../commands/unregisterGuild';
import updateGuild from '../../commands/updateGuild';

const { CLIENT_ID, DISCORD_TOKEN } = process.env;

const commands = [
  ping.data,
  pupper.data,
  registerGuild.data,
  getInfo.data,
  unregisterGuild.data,
  updateGuild.data,
].map((command) => command.toJSON!());

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN!);

const registerCommands = async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID!), {
      body: commands,
    });
    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
};

export default registerCommands;
