import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { z } from 'zod';
import DiscordGuild from '../database/model/DiscordGuild';

import CommandInterface from './types/CommandInterface';

const registerGuild: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('registerguild')
    .setDescription('Registers your server.')
    .addChannelOption((option) =>
      option
        .setName('pupper-channel')
        .setDescription(
          'The channel where the bot will periodically post a rare pupper.',
        )
        .setRequired(true),
    ),

  async execute(interaction) {
    const pupperChannel = interaction.options
      .get('pupper-channel')!
      .value!.toString();

    // remove all non numeric characters from pupperChannel

    const channel = pupperChannel.replace(/\D/g, '');

    const guild = new DiscordGuild();
    guild.name = interaction.guild!.name;
    guild.guildId = interaction.guildId!;
    guild.pupperChannelId = channel;
    guild.createdAt = new Date();

    await guild.save();

    // create an embed with the guild information

    const embed = new EmbedBuilder().setTitle('Guild Registered!').addFields([
      { name: 'Guild Name', value: guild.name },
      { name: 'Pupper Channel', value: `<#${guild.pupperChannelId}>` },
    ]);

    await interaction.reply({ embeds: [embed] });
  },
};

export default registerGuild;
