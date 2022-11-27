import { Guild } from 'discord.js';
import logger from '../config/logger';
import { deleteGuild } from '../database/services/DiscordGuildServices';

const guildDelete = async (guild: Guild) => {
  try {
    await deleteGuild(guild.id);
  } catch (error) {
    logger.error(error);
  }
};

export default guildDelete;
