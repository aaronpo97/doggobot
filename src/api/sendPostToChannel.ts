import { TextChannel, EmbedBuilder } from 'discord.js';
import getRandomPost from '../scheduled-jobs/getRandomPost';

const sendPupperToChannel = async (channel: TextChannel) => {
  const randomPost = await getRandomPost();
  if (!randomPost) {
    await channel.send('No more puppers to send 🥺');
    return;
  }
  const embed = new EmbedBuilder()
    .setTitle("Here's a pupper for you!")
    .setURL(randomPost.message)
    .setImage(randomPost.message)
    .setFooter({ text: `From https://dog.ceo/dog-api/` });

  await channel.send({ embeds: [embed] });
};

export default sendPupperToChannel;
