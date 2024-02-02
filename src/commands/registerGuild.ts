import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import GuildService from '../services/GuildService';
import commandWrapper from '../util/commandWrapper';
import CommandInterface from './types/CommandInterface';
import prisma from '../database/client';

const registerGuild: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('registerguild')
    .setDescription('Registers your server.')
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
    if (guild) {
      await interaction.reply('Your guild is already registered!');
      return;
    }

    const pupperChannel = interaction.options.get('pupper-channel')!.value!.toString();
    const channel = pupperChannel.replace(/\D/g, '');

    const newGuild = await service.createGuild({
      guildId: interaction.guildId!,
      pupperChannelId: channel,
      name: interaction.guild!.name,
    });

    const embed = new EmbedBuilder().setTitle('Guild Registered!').addFields([
      { name: 'Guild Name', value: newGuild.name },
      { name: 'Pupper Channel', value: `<#${newGuild.pupperChannelId}>` },
    ]);

    await interaction.reply({ embeds: [embed] });
  }),
};

export default registerGuild;
