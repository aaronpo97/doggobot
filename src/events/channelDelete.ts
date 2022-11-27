import { DMChannel, NonThreadGuildBasedChannel } from 'discord.js';
import logger from '../config/logger';
import { getGuildById, deleteGuild } from '../database/services/DiscordGuildServices';

const channelDelete = async (channel: DMChannel | NonThreadGuildBasedChannel) => {
  try {
    if (channel instanceof DMChannel) {
      return;
    }
    const { id, guild } = channel;
    const guildData = await getGuildById(guild.id);

    if (!guildData || guildData.pupperChannelId !== id) {
      return;
    }

    await deleteGuild(guild.id);
  } catch (error) {
    logger.error(error);
  }
};

export default channelDelete;
