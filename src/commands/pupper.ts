import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import getRandomPost from '../scheduled-jobs/getRandomPost';
import Command from '../util/Command';

const pupper = new Command(
  new SlashCommandBuilder()
    .setName('pupper')
    .setDescription('Replies with a random pupper from https://dog.ceo/dog-api/'),
  async (interaction) => {
    const randomPost = await getRandomPost();

    if (!randomPost) {
      await interaction.reply('No more puppers to send 🥺');
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle("Here's a pupper for you!")
      .setURL(randomPost.message)
      .setImage(randomPost.message)
      .setFooter({ text: 'From https://dog.ceo/dog-api/' });

    await interaction.reply({ embeds: [embed] });
  },
);

export default pupper;
