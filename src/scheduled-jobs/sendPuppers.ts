import { Client, TextChannel } from 'discord.js';
import sendPupperToChannel from '../api/sendPostToChannel';

import { getAllGuilds } from '../database/services/DiscordGuildServices';

const sendPuppers = async (readyClient: Client<true>) => {
  const guilds = await getAllGuilds();

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
