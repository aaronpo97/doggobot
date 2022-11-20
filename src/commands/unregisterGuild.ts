import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { createGuild, deleteGuild, getGuildById } from '../database/services/DiscordGuildServices';
import commandWrapper from '../util/commandWrapper';
import CommandInterface from './types/CommandInterface';

const unregisterGuild: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('unregisterguild')
    .setDescription('Unregisters your server. This will disable pupper posting in your server.')
    .setDefaultMemberPermissions(0),

  execute: commandWrapper(async (interaction) => {
    const guild = await getGuildById(interaction.guildId!);
    if (!guild) {
      await interaction.reply("You haven't registered your server yet!");
      return;
    }

    await deleteGuild(interaction.guildId!);
    await interaction.reply('Server unregistered!');
  }),
};

export default unregisterGuild;
