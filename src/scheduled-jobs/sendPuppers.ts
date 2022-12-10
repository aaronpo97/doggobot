import { Client, TextChannel, EmbedBuilder } from 'discord.js';

import { getAllGuilds } from '../database/services/DiscordGuildServices';
import getRandomPost from './getRandomPost';

export const sendPupperToChannel = async (channel: TextChannel) => {
  const randomPost = await getRandomPost();
  if (!randomPost) {
    await channel.send('No more puppers to send 🥺');
    return;
  }
  const embed = new EmbedBuilder()
    .setTitle(randomPost.title)
    .setURL(`https://reddit.com${randomPost.permalink}`)
    .setImage(randomPost.url)
    .setFooter({ text: `Posted by u/${randomPost.author}` });

  await channel.send({ embeds: [embed] });
};

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
