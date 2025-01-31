import { SlashCommandBuilder } from 'discord.js';
import GuildService from '../services/GuildService';
import commandWrapper from '../util/commandWrapper';
import CommandInterface from './types/CommandInterface';
import prisma from '../database/client';

const updateGuild: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('updateguild')
    .setDescription('Update the pupper channel for your server.')
    .addChannelOption((option) =>
      option
        .setName('pupper-channel')
        .setDescription('The channel where the bot will periodically post a rare pupper.')
        .setRequired(true),
    )
    .setDefaultMemberPermissions(0),

  execute: commandWrapper(async (interaction) => {
    const service = new GuildService(prisma);
    const guild = await service.getGuildById(interaction.guildId!);
    if (!guild) {
      await interaction.reply("You haven't registered your server yet!");
      return;
    }

    const pupperChannel = interaction.options.get('pupper-channel')!.value!.toString();
    const channelId = pupperChannel.replace(/\D/g, '');

    await service.updateGuildById({ guildId: interaction.guildId!, pupperChannelId: channelId });
    await interaction.reply('Pupper channel updated!');
  }),
};

export default updateGuild;
