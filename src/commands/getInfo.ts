import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import GuildService from '../services/GuildService';
import prisma from '../database/client';
import Command from '../util/Command';

const getInfo = new Command(
  new SlashCommandBuilder()
    .setName('getinfo')
    .setDescription('Gets the info stored in the database for this server.')
    .setDefaultMemberPermissions(0),
  async (interaction) => {
    const service = new GuildService(prisma);
    const guild = await service.getGuildById(interaction.guildId!);

    if (!guild) {
      await interaction.reply(
        'Your guild is not registered. Please use the /registerguild command to register your guild.',
      );
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle('Guild Info')
      .addFields([{ name: 'Guild Name', value: guild.name }])
      .addFields({ name: 'Pupper Channel', value: `<#${guild.pupperChannelId}>` });

    await interaction.reply({ embeds: [embed] });
  },
);
export default getInfo;
