import { SlashCommandBuilder } from 'discord.js';
import GuildService from '../services/GuildService';
import prisma from '../database/client';
import commandWrapper from '../util/commandWrapper';
import CommandInterface from './types/CommandInterface';

const unregisterGuild: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('unregisterguild')
    .setDescription('Unregisters your server. This will disable pupper posting in your server.')
    .setDefaultMemberPermissions(0),

  execute: commandWrapper(async (interaction) => {
    const service = new GuildService(prisma);
    const guild = await service.getGuildById(interaction.guildId!);
    if (!guild) {
      await interaction.reply("You haven't registered your server yet!");
      return;
    }

    await service.deleteGuild(interaction.guildId!);
    await interaction.reply('Server unregistered!');
  }),
};

export default unregisterGuild;
