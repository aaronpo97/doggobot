import { SlashCommandBuilder, TextChannel } from 'discord.js';
import sendPupperToChannel from '../api/sendPostToChannel';
import GuildService from '../services/GuildService';

import commandWrapper from '../util/commandWrapper';
import CommandInterface from './types/ICommand';
import prisma from '../database/client';

const test: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription(
      'Trigger a pupper message to be sent to the registered pupper channel.',
    )
    .setDefaultMemberPermissions(0),

  execute: commandWrapper(async (interaction) => {
    const service = new GuildService(prisma);
    const guild = await service.getGuildById(interaction.guildId!);

    if (!guild) {
      await interaction.reply('Your guild is not registered!');
      return;
    }

    const pupperChannel = interaction.client.channels.cache.get(guild.pupperChannelId);

    if (!pupperChannel) {
      await interaction.reply('Your guild is not registered!');
      return;
    }

    await sendPupperToChannel(pupperChannel as TextChannel);

    await interaction.reply('Pupper sent!');
  }),
};

export default test;
