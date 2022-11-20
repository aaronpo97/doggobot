import { CacheType, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import logger from '../config/logger';
import { getGuildById } from '../database/services/DiscordGuildServices';
import commandWrapper from '../util/commandWrapper';
import CommandInterface from './types/CommandInterface';

const getInfo: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('getinfo')
    .setDescription('Gets the info stored in the database for this server.')
    .setDefaultMemberPermissions(0),

  execute: commandWrapper(async (interaction) => {
    const guild = await getGuildById(interaction.guildId!);

    if (!guild) {
      await interaction.reply(
        'Your guild is not registered. Please use the /registerguild command to register your guild.',
      );
      return;
    }

    const embed = new EmbedBuilder().setTitle('Guild Info').addFields([
      { name: 'Guild Name', value: guild.name },
      { name: 'Pupper Channel', value: `<#${guild.pupperChannelId}>` },
    ]);

    await interaction.reply({ embeds: [embed] });
  }),
};

export default getInfo;
