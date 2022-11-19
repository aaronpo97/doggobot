import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import getRandomPost from '../scheduled-jobs/getRandomPost';
import redditResponseSchema from '../schema/redditResponseSchema';
import CommandInterface from './types/CommandInterface';

const pupper: CommandInterface = {
  data: new SlashCommandBuilder().setName('pupper').setDescription('Replies with a random pupper!'),
  async execute(interaction) {
    try {
      const randomPost = await getRandomPost();
      const embed = new EmbedBuilder()
        .setTitle(randomPost.title)
        .setURL(`https://reddit.com${randomPost.permalink}`)
        .setImage(randomPost.url)
        .setFooter({ text: `Posted by u/${randomPost.author}` });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply('Something went wrong. Please try again later.');
    }
  },
};

export default pupper;
