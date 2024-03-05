import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import Command from '../util/Command';

const help = new Command(
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Replies with a list of commands!'),
  async (interaction) => {
    const embed = new EmbedBuilder()
      .setTitle('Help')
      .setDescription('Here is a list of commands')
      .addFields([
        {
          name: '/ping',
          value: 'Replies with Pong!',
        },
        {
          name: '/help',
          value: 'Replies with a list of commands!',
        },
        {
          name: '/pupper',
          value: 'Replies with a random pupper!',
        },
        {
          name: '/registerguild',
          value: 'Registers the guild with the bot.',
        },
        {
          name: '/unregisterguild',
          value: 'Unregisters the guild with the bot.',
        },
        {
          name: '/updateguild',
          value: 'Updates the guild with the bot.',
        },
        {
          name: '/test',
          value: 'Trigger a pupper message to be sent to the registered pupper channel.',
        },
      ]);

    await interaction.reply({ embeds: [embed] });
  },
);
export default help;
