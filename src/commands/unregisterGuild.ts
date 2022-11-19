import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { createGuild, deleteGuild, getGuildById } from '../database/services/DiscordGuildServices';
import CommandInterface from './types/CommandInterface';

const unregisterGuild: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('unregisterguild')
    .setDescription('Unregisters your server. This will disable pupper posting in your server.')
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    try {
      const guild = await getGuildById(interaction.guildId!);
      if (!guild) {
        await interaction.reply("You haven't registered your server yet!");
        return;
      }

      await deleteGuild(interaction.guildId!);
      await interaction.reply('Server unregistered!');
    } catch (error) {
      await interaction.reply(
        'Something went wrong while registering your guild. Please try again later.',
      );
    }
  },
};

export default unregisterGuild;
