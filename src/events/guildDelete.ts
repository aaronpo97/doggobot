import { Guild } from 'discord.js';
import logger from '../config/logger';
import GuildService from '../services/GuildService';
import prisma from '../database/client';

const guildDelete = async (guild: Guild) => {
  try {
    const service = new GuildService(prisma);
    await service.deleteGuild(guild.id);
  } catch (error) {
    logger.error(error);
  }
};

export default guildDelete;
