import { DMChannel, NonThreadGuildBasedChannel } from 'discord.js';
import logger from '../config/logger';
import prisma from '../database/client';
import GuildService from '../services/GuildService';

const channelDelete = async (channel: DMChannel | NonThreadGuildBasedChannel) => {
  try {
    const service = new GuildService(prisma);

    if (channel instanceof DMChannel) {
      return;
    }
    const { id, guild } = channel;
    const guildData = await service.getGuildById(guild.id);

    if (!guildData || guildData.pupperChannelId !== id) {
      return;
    }

    await service.deleteGuild(guild.id);
  } catch (error) {
    logger.error(error);
  }
};

export default channelDelete;
