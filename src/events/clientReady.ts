import { ActivityType, Client } from 'discord.js';
import cron from 'node-cron';

import registerCommands from '../config/discord/deployCommands';
import logger from '../config/logger';

import sendPuppers from '../scheduled-jobs/sendPuppers';

const clientReady = async (client: Client<true>) => {
  try {
    await registerCommands();
    client.user!.setActivity('/help', { type: ActivityType.Listening });
    logger.info(`Logged in as ${client.user!.tag}`);
    cron.schedule('0 */3 * * *', async () => {
      await sendPuppers(client);
    });
  } catch (error) {
    logger.error(error);
  }
};

export default clientReady;
