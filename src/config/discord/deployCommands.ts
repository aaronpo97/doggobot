/* eslint-disable import/no-extraneous-dependencies */

import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import getInfo from '../../commands/getInfo';
import help from '../../commands/help';
import ping from '../../commands/ping';
import test from '../../commands/test';
import pupper from '../../commands/pupper';
import registerGuild from '../../commands/registerGuild';
import unregisterGuild from '../../commands/unregisterGuild';
import updateGuild from '../../commands/updateGuild';
import logger from '../logger';
import repo from '../../commands/repo';

const { CLIENT_ID, DISCORD_TOKEN } = process.env;

const commands = [
  ping.data,
  pupper.data,
  registerGuild.data,
  getInfo.data,
  unregisterGuild.data,
  updateGuild.data,
  help.data,
  test.data,
  repo.data,
].map((command) => command.toJSON!());

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN!);

const registerCommands = async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID!), {
      body: commands,
    });
    logger.info('Successfully registered application commands.');
  } catch (error) {
    logger.error(error);
  }
};

export default registerCommands;
