import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import getRandomPost from '../scheduled-jobs/getRandomPost';
import commandWrapper from '../util/commandWrapper';
import CommandInterface from './types/CommandInterface';

const pupper: CommandInterface = {
  data: new SlashCommandBuilder().setName('pupper').setDescription('Replies with a random pupper!'),
  execute: commandWrapper(async (interaction) => {
    const randomPost = await getRandomPost();

    if (!randomPost) {
      await interaction.reply('No more puppers to send 🥺');
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(randomPost.title)
      .setURL(`https://reddit.com${randomPost.permalink}`)
      .setImage(randomPost.url)
      .setFooter({ text: `Posted by u/${randomPost.author}` });

    await interaction.reply({ embeds: [embed] });
  }),
};

export default pupper;
