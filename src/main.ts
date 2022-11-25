import 'dotenv/config';
import 'reflect-metadata';
import { Events } from 'discord.js';
import cron from 'node-cron';
import client from './config/discord/client';
import registerCommands from './config/discord/deployCommands';
import ping from './commands/ping';
import pupper from './commands/pupper';
import registerGuild from './commands/registerGuild';
import AppDataSource from './database/AppDataSource';
import getInfo from './commands/getInfo';
import unregisterGuild from './commands/unregisterGuild';
import updateGuild from './commands/updateGuild';
import sendPuppers from './scheduled-jobs/sendPuppers';
import logger from './config/logger';
import help from './commands/help';

const token = process.env.DISCORD_TOKEN;

client.once(Events.ClientReady, async (readyClient) => {
  await registerCommands();
  logger.info(`Logged in as ${client.user!.tag}`);
  await AppDataSource.initialize();

  cron.schedule('0 */3 * * *', async () => {
    await sendPuppers(readyClient);
  });
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;
  switch (interaction.commandName) {
    case 'ping':
      await ping.execute(interaction);
      break;
    case 'pupper':
      await pupper.execute(interaction);
      break;
    case 'registerguild':
      await registerGuild.execute(interaction);
      break;
    case 'getinfo':
      await getInfo.execute(interaction);
      break;
    case 'unregisterguild':
      await unregisterGuild.execute(interaction);
      break;
    case 'updateguild':
      await updateGuild.execute(interaction);
      break;
    case 'help':
      await help.execute(interaction);
      break;
    default:
      break;
  }
});

client.login(token);
