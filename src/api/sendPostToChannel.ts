import { TextChannel, EmbedBuilder } from 'discord.js';
import getRandomPost from '../scheduled-jobs/getRandomPost';

const sendPupperToChannel = async (channel: TextChannel) => {
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

export default sendPupperToChannel;
