import { CommandInteraction, CacheType } from 'discord.js';
import logger from '../config/logger';

// eslint-disable-next-line no-unused-vars
type FunctionType = (interaction: CommandInteraction<CacheType>) => Promise<void>;

function commandWrapper(fn: FunctionType) {
  return async (interaction: CommandInteraction<CacheType>) => {
    try {
      await fn(interaction);
    } catch (error) {
      logger.error(error);
      await interaction.reply('Something went wrong. Please try again later.');
    }
  };
}

export default commandWrapper;
