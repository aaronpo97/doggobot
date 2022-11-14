import { SlashCommandBuilder } from 'discord.js';
import { updateGuildById, getGuildById } from '../database/services/DiscordGuildServices';
import CommandInterface from './types/CommandInterface';

const updateGuild: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('updateguild')
    .setDescription('Update the pupper channel for your server.')
    .addChannelOption((option) =>
      option
        .setName('pupper-channel')
        .setDescription('The channel where the bot will periodically post a rare pupper.')
        .setRequired(true),
    ),

  async execute(interaction) {
    try {
      if (!(await getGuildById(interaction.guildId!))) {
        await interaction.reply("You haven't registered your server yet!");
        return;
      }

      const pupperChannel = interaction.options.get('pupper-channel')!.value!.toString();

      const channel = pupperChannel.replace(/\D/g, '');

      await updateGuildById({ guildId: interaction.guildId!, pupperChannelId: channel });

      await interaction.reply('Pupper channel updated!');
    } catch (error) {
      await interaction.reply(
        'Something went wrong while registering your guild. Please try again later.',
      );
    }
  },
};

export default updateGuild;
