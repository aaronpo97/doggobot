/* eslint-disable import/no-extraneous-dependencies */

import fs from 'fs/promises';
import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import path from 'path';
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
    const commandFiles = await fs.readdir(path.join(__dirname, '../../commands'));
    const commandsToRegister = await Promise.all(
      commandFiles
        .filter((file) => !file.includes('types'))
        .map(async (file) => {
          const command = (await import(
            `../../commands/${file}`
          )) as typeof import('../../commands/ping');

          // if there is no data, then it's not a command
          if (!command.default.data) {
            throw new Error('A non-command file was found in the commands directory.');
          }

          return command.default.data.toJSON!();
        }),
    );
    await rest.put(Routes.applicationCommands(CLIENT_ID!), {
      body: commandsToRegister,
    });
    logger.info('Successfully registered application commands.');
  } catch (error) {
    logger.error(error);
  }
};

export default registerCommands;
