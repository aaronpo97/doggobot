import { ActivityType, Client } from 'discord.js';
import cron from 'node-cron';

import registerCommands from '../config/discord/deployCommands';
import logger from '../config/logger';
import redisClient from '../config/redis/redisClient';
import AppDataSource from '../database/AppDataSource';
import getRarePuppersPosts from '../api/getRarePuppersPosts';
import sendPuppers from '../scheduled-jobs/sendPuppers';

const clientReady = async (client: Client<true>) => {
  const setPupperCache = async () => {
    const puppers = await getRarePuppersPosts();
    await redisClient.json.set('puppers', '.', puppers);
  };

  try {
    const clientStartupTasks: Promise<unknown>[] = [
      AppDataSource.initialize(),
      registerCommands(),
      redisClient.connect(),
      setPupperCache(),
    ];

    await Promise.all(clientStartupTasks);
    client.user!.setActivity('/help', { type: ActivityType.Listening });
    logger.info(`Logged in as ${client.user!.tag}`);

    cron.schedule('0 0 * * *', setPupperCache);
    cron.schedule('0 */3 * * *', async () => {
      await sendPuppers(client);
    });
  } catch (error) {
    logger.error(error);
  }
};

export default clientReady;
