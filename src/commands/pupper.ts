import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import logger from '../config/logger';
import getRandomPost from '../scheduled-jobs/getRandomPost';
import redditResponseSchema from '../schema/redditResponseSchema';
import commandWrapper from '../util/commandWrapper';
import CommandInterface from './types/CommandInterface';

const pupper: CommandInterface = {
  data: new SlashCommandBuilder().setName('pupper').setDescription('Replies with a random pupper!'),
  execute: commandWrapper(async (interaction) => {
    const randomPost = await getRandomPost();
    const embed = new EmbedBuilder()
      .setTitle(randomPost.title)
      .setURL(`https://reddit.com${randomPost.permalink}`)
      .setImage(randomPost.url)
      .setFooter({ text: `Posted by u/${randomPost.author}` });

    await interaction.reply({ embeds: [embed] });
  }),
};

export default pupper;
