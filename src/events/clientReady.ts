import { Client } from 'discord.js';
import cron from 'node-cron';

import registerCommands from '../config/discord/deployCommands';
import logger from '../config/logger';
import AppDataSource from '../database/AppDataSource';
import sendPuppers from '../scheduled-jobs/sendPuppers';

const clientReady = async (client: Client<true>) => {
  await registerCommands();
  logger.info(`Logged in as ${client.user!.tag}`);
  await AppDataSource.initialize();

  cron.schedule('0 */3 * * *', async () => {
    await sendPuppers(client);
  });
};

export default clientReady;
