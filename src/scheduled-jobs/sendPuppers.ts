import { Client, TextChannel } from 'discord.js';
import sendPupperToChannel from '../api/sendPostToChannel';

import GuildService from '../services/GuildService';
import prisma from '../database/client';

const sendPuppers = async (readyClient: Client<true>) => {
  const service = new GuildService(prisma);
  const guilds = await service.getAllGuilds();

  guilds.forEach(async (guild) => {
    const { pupperChannelId } = guild;
    const channel = (await readyClient.channels.fetch(pupperChannelId)) as TextChannel | null;

    if (!channel) {
      return;
    }

    await sendPupperToChannel(channel);
  });
};

export default sendPuppers;
