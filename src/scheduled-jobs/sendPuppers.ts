import { Client, TextChannel, EmbedBuilder } from 'discord.js';

import { getAllGuilds } from '../database/services/DiscordGuildServices';
import getRandomPost from './getRandomPost';

const sendPuppers = async (readyClient: Client<true>) => {
  const guilds = await getAllGuilds();

  guilds.forEach(async (guild) => {
    const randomPost = await getRandomPost();
    const { pupperChannelId } = guild;
    const channel = (await readyClient.channels.fetch(pupperChannelId)) as TextChannel | null;

    if (!channel) {
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(randomPost.title)
      .setURL(`https://reddit.com${randomPost.permalink}`)
      .setImage(randomPost.url)
      .setFooter({ text: `Posted by u/${randomPost.author}` });

    await channel.send({ embeds: [embed] });
  });
};

export default sendPuppers;
